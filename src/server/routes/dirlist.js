import express from 'express';
import axios from 'axios';
import Sequelize from 'sequelize';
import { async } from 'q';

const router = express.Router();
const cors = require("cors");
router.use(cors());

const sequelize = new Sequelize('heroku_c41d79b16d69b76', 'bbd90f30305cab', '3a19c4e9', {
    host: 'us-cdbr-iron-east-02.cleardb.net',
    port: '3306',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


const TableDirectory = sequelize.define(
    'TableDirectory',
    {
        dir_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dir_name: {
            type: Sequelize.STRING
        },
        owner_id: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_directory'
    }
);

const TableGroup = sequelize.define(
    'TableGroup',
    {
        group_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        group_name: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_group'
    }
);


const TableArticle = sequelize.define(
    'TableArticle',
    {
        article_id_AI: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        article_originId: {
            type: Sequelize.STRING
        },
        article_url: {
            type: Sequelize.STRING
        },
        dir_id: {
            type: Sequelize.INTEGER
        },
        article_author: {
            type: Sequelize.STRING
        },
        article_content: {
            type: Sequelize.STRING
        },
        article_title: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_article'
    }
);

const TableDirAuth = sequelize.define(
    'TableDirAuth',
    {
        dir_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        dir_auth: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_dir_auth'
    }
);

router.get('/', (req, res, next) => {
    TableDirectory.findAll({
        where: { owner_id: req.session.user_id },
        order: [['dir_id', 'DESC']]
    })
        .then(TableDirectory => {
            res.json(TableDirectory);
        })
})

router.get('/otherdirlist', function (req, res, next) {
   let new_query = 'SELECT * FROM heroku_c41d79b16d69b76.tbl_directory INNER JOIN tbl_dir_auth where tbl_directory.dir_id = tbl_dir_auth.dir_id AND NOT(tbl_directory.owner_id = :now_user) AND tbl_dir_auth.dir_auth = :now_auth';
   let values = {
       now_auth: req.session.group_id,
       now_user: req.session.user_id
   };
   sequelize.query(new_query, { replacements: values, model: TableDirectory })
   .then(result => res.send(result))
//    sequelize.query(new_query, { replacements: values, model: TableDirectory })
//         .then(result => {
//             console.log("find dir_id" + result);
//             let send_result = [];
//             result.map((tmp, i) => {
//                 send_result.push(TableArticle.findAll({
//                     where: {dir_id: tmp.dir_id}
//                 }).then(tmp => {
//                     return tmp;
//                 }))
//             })
//             return Promise.all(send_result)
//             // result.map((tmp, i) => {
//             //     TableArticle.findAll({
//             //         where: {dir_id: tmp.dir_id}
//             //     }).then((final) => console.log("after:" + final))
//             // })
//             // console.log("done: " + JSON.stringify(result));
//             // console.log("working:" + result[0].dir_id);
//         }).then(wow => res.send(wow))
});
    // let new_query = 'SELECT * FROM tbl_directory WHERE tbl_directory.share_group_id = :now_group AND NOT (tbl_directory.owner_id = :now_user)'
    // let values = {
    //     now_group: req.session.group_id,
    //     now_user: req.session.user_id
    // };
    // sequelize.query(new_query, { replacements: values, model: TableDirectory })
    //     .then(tableDirectory => {
    //         // console.log(JSON.stringify(tableDirectory));
    //         res.json(tableDirectory);
    //     })

router.post('/grouplist', (req, res, next) => {
    TableGroup.findAll()
        .then(TableGroup => {
            // console.log(JSON.stringify(TableGroup));
            let results = [{ value: 0, label: req.session.user_id }];
            TableGroup.map((result, i) => {
                results.push({ value: result.group_id, label: result.group_name });
                // results.push({ value: result.group_id, text: result.group_name });
                console.log(results);
            })
            // console.log("now: " + results);
            res.json(results);
        })
})

router.get('/new', (req, res) => {
    TableDirectory.findAll({
        where: { owner_id: req.session.user_id },
        order: [['dir_id', 'DESC']]
    })
        .then(TableDirectory => {
            res.json(TableDirectory);
        })

})

router.post('/insertDir', (req, res, next) => {
    const inputData = {
        dir_name: req.body.insertDirinput,
        owner_id: req.session.user_id
    };
    // console.log(inputData);

    if (typeof req.session.user_id === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    if (req.body.insertDirinput === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 3
        })
    }

    TableDirectory.findOne({
        where: {
            dir_name: req.body.insertDirinput,
            owner_id: req.session.user_id
        }
    })
        .then((response) => {
            if (response) {
                return res.status(400).json({
                    error: " 동일한 이름의 디렉터리가 존재합니다",
                    code: 2
                })
            }
            TableDirectory.create(inputData)
                .then(dirInput => {
                    const dirInputData = {
                        dir_id: dirInput.dir_id,
                        dir_auth: '0'
                    };

                    TableDirAuth.create(dirInputData)
                        .then(() => { return res.json({ success: true }); })
                })
                .catch(err => {
                    return res.send('error' + err)
                })
        })

});

router.delete('/delete', (req, res) => {
    const dltdirname = req.body.deleteDirInput;
    console.log(dltdirname);
    TableDirectory.findOne({
        where: { dir_name: req.body.deleteDirInput, owner_id: req.session.user_id }
    })
        .then(tableDirectory => {
            if (!tableDirectory) {
                return res.status(404).json({
                    error: "NO DIRECTORY",
                    code: 3
                });
            }
            // let first_query = 'DELETE * FROM tbl_article INNER JOIN tbl_directory ON tbl_directory.dir_Id = tbl_article.dir_id WHERE tbl_directory.dir_name = :now_dir';
            // let values = {
            //    now_dir: req.body.deleteDirInput
            // };
            // sequelize.query(first_query, {replacements:values, model:TableArticle})
            // .then(result => console.log(result));

            TableDirectory.destroy({
                where: { dir_name: req.body.deleteDirInput }
            })
                .then(response => {
                    res.json({ success: true });
                })
                .catch(err => console.log("error" + err));
        })
    // TableDirectory.findOne({
    //     where: {dir_name: req.body.deleteDirInput, owner_id: req.session.user_id}
    // })
    // .then(dir => {
    //     console.log(dir);
    //     if(!dir) {
    //         return res.status(404).json({
    //             error: "NO RESOURCE",
    //             code : 3
    //         });
    //     }
    //     if(dir.owner_id != req.session.user_id){
    //         return res.status(403).json({
    //             error: "PERMISSION FAILURE",
    //             code : 4
    //         });
    //     }
    //     console.log("wow?");
    //     TableDirectory.destroy({
    //         where: {dir_name: req.body.deleteDirInput}
    //     }).then(dirresult => {
    //             res.json({success:true});
    //         })
    //         .catch(err => console.log("error" + err))
    //     })
    // .catch(err => {
    //     return res.send('error' + err);
    // })
});

router.post('/groupAuth', (req, res, next) => {
    let group_auth = req.body.group_auth;
    TableDirectory.findOne({
        where: { owner_id: req.session.user_id, dir_name: req.body.now_dir },
    }).then((response) => {
        let tmp = response.dir_id;
        TableDirAuth.destroy({
            where: { dir_id: response.dir_id }
        }).then((response) => {
            console.log(tmp);
            console.log(group_auth);
            group_auth.map((now, i) => {
                TableDirAuth.create({
                    dir_id: tmp,
                    dir_auth: now
                })
            })
            // let inputData = [{dir_id, dir_auth}];
            // for(let i=0; i<group_auth.length; i++){
            //     inputData[i].dir_id = tmp;
            //     inputData[i].dir_auth = group_auth[i];
            // }
            // console.log("after: " + inputData);
            return res.send("success");
        })
    })
})

router.post('/setuserdefault', function (req, res, next) {
    console.log("why notbb");
    TableDirectory.findOne({
        where: { owner_id: req.session.user_id, dir_name: req.body.now_dir_name }
    }).then(response => {
        TableDirAuth.findAll({
            where: { dir_id: response.dir_id }
        }).then((result) => res.json(result));
    });
})


export default router;