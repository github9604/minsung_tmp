import express from 'express';
import axios from 'axios';
import Sequelize from 'sequelize';

const router = express.Router();
const cors = require("cors");
router.use(cors());

const sequelize = new Sequelize('kt_intern', 'min9604', '!zpdlxl9604', {
    host: 'localhost',
    port: '6002',
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
        },
        share_group_id: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_directory'
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

const ArticleToDirectory = sequelize.define(
    'ArticleToDirectory',
    {
        idx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post_urlid: {
            type: Sequelize.TEXT
        },
        dir_name: {
            type: Sequelize.STRING
        },
        dir_owner: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'article_to_directory'
    }
);

router.post('/grp', function(req, res, next) {
    TableArticle.findAll({
        where: {dir_id: req.body.now_dir.data.dir_id}
    }).then((response) => res.send(response))
    // TableArticle.findAll({
    //     where: {dir_id: req.body.now_dir}
    // })
    // .then(tableArticle => {
    //    let arrayOfPromises = [];
    //    tableArticle.map((result, i) => {
    //        let base_url = 'https://cloud.feedly.com//v3/entries/' + result.post_urlid;
    //        arrayOfPromises.push(
    //            axios.get(base_url)
    //            .then(response => response.data)
    //            .catch(error => console.log(error))
    //        );
    //    });
    //    Promise.all(arrayOfPromises).then(
    //        function(values){
    //            let tmp = [];
    //            for(let i=0; i<values.length; i++){
    //                Array.prototype.push.apply(tmp, values[i]);
    //            }
    //            let sortedvalues = tmp;
    //            res.json(sortedvalues);
    //        }
    //    );
    // })
})

router.post('/mine', function(req, res, next) {
    TableDirectory.findOne({
        where: {owner_id: req.session.user_id, dir_name: req.body.now_dir},
        attributes: [
            'dir_id'
        ]
    }).then(
        (response) => {
           let dir_id = response.dir_id;
            TableArticle.findAll({
                where: {dir_id: dir_id}
            }).then((response) => res.send(response))
        }
    )
    // TableArticle.findAll({
    //     where: {dir_owner: req.session.user_id, dir_name:req.body.now_dir}
    // })
    // .then(tableArticle => {
    //     // console.log(tableArticle);
    //     let arrayOfPromises = [];
    //     tableArticle.map((result, i) => {
    //         let base_url = 'https://cloud.feedly.com//v3/entries/' + result.post_urlid;
    //         // console.log(base_url);
    //         arrayOfPromises.push(
    //             axios.get(base_url)
    //             .then(response => response.data)
    //             .catch(error => console.log(error))
    //         );
    //     });

    //     Promise.all(arrayOfPromises).then(
    //         function(values){
    //             let tmp = [];
    //             for(let i=0; i<values.length; i++){
    //                 Array.prototype.push.apply(tmp, values[i]);
    //             }
    //             // for(let i=0; i<values.length; i++){
    //             //     Array.prototype.push.apply(values[0], values[i+1]);
    //             //     // console.log("values: " + values[0]);
    //             // }
    //             let sortedvalues = tmp;
    //             // let sortedvalues = values[0];
    //             // console.log(JSON.stringify(sortedvalues));
    //             res.json(sortedvalues);
    //         }
    //     );
    //     // console.log(articleTodir);
    //     // console.log(JSON.stringify(articleTodir));
    //     // res.json(articleTodir);
    // })
});

router.post('/', function(req, res, next) {
    ArticleToDirectory.findAll({
        where: {dir_owner: req.session.user_id, dir_name:req.body.now_dir}
    })
    .then(articleTodir => {
        // console.log(articleTodir);
        let arrayOfPromises = [];
        articleTodir.map((result, i) => {
            let base_url = 'https://cloud.feedly.com//v3/entries/' + result.post_urlid;
            // console.log(base_url);
            arrayOfPromises.push(
                axios.get(base_url)
                .then(response => response.data)
                .catch(error => console.log(error))
            );
        });

        Promise.all(arrayOfPromises).then(
            function(values){
                let tmp = [];
                for(let i=0; i<values.length; i++){
                    Array.prototype.push.apply(tmp, values[i]);
                }
                // for(let i=0; i<values.length; i++){
                //     Array.prototype.push.apply(values[0], values[i+1]);
                //     // console.log("values: " + values[0]);
                // }
                let sortedvalues = tmp;
                // let sortedvalues = values[0];
                // console.log(JSON.stringify(sortedvalues));
                res.json(sortedvalues);
            }
        );
        // console.log(articleTodir);
        // console.log(JSON.stringify(articleTodir));
        // res.json(articleTodir);
    })
});

export default router;