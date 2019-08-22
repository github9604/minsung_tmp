import express from 'express';
import axios from 'axios';
import Sequelize from 'sequelize';

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

const TableFeed = sequelize.define(
    'TableFeed',
    {
        feed_id_AI: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        feed_id: {
            type: Sequelize.STRING
        },
        feed_icon: {
            type: Sequelize.STRING
        },
        feed_description: {
            type: Sequelize.STRING
        },
        feed_name: {
            type: Sequelize.STRING
        },
        feed_reader_id: {
            type: Sequelize.INTEGER
        },
        feed_topic: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_feed'
    }
);

const BoardFeed = sequelize.define(
    'BoardFeed',
    {
        post_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post_feedid: {
            type: Sequelize.INTEGER,
        },
        user_id: {
            type: Sequelize.STRING
        },
        websiteTitle: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'board_feed'
    }
);

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


router.post('/', function (req, res, next) {
    console.log("wow: " + req.body.results);
    TableFeed.findAll({
        where: { feed_reader_id: req.session.user_id },
        attributes: [
            'feed_id'
        ],
        limit: 6
    })
        .then(tableFeed => {
            let arrayOfPromises = [];
            tableFeed.map((result, i) => {
                // console.log("result: " + result.post_feedid);
                let base_url = 'http://cloud.feedly.com//v3/streams/contents?streamId=' + result.feed_id;
                arrayOfPromises.push(
                    axios.get(base_url)
                        .then(response => (response.data.items))
                        .catch(error => console.log(error))
                );
            });

            Promise.all(arrayOfPromises).then(
                function (values) {
                    // console.log(values[0]);
                    // let targetvalues_0 = JSON.parse(JSON.stringify(values[0]));
                    // let targetvalues_1 = JSON.parse(JSON.stringify(values[1]));
                    // let result = Object.assign(targetvalues_0, targetvalues_1);
                    for (let i = 0; i < values.length - 1; i++) {
                        Array.prototype.push.apply(values[0], values[i + 1]);
                    }
                    // console.log("result: " + values[0]);
                    let sortedvalues = values[0];
                    sortedvalues.sort(function (b, a) {
                        return a["published"] - b["published"];
                    });
                    // console.log(sortedvalues.slice(0, 3));
                    res.json(sortedvalues.slice(0, req.body.page + 6));
                    // // res.json(sortedvalues.slice(0,3));
                    // res.json(sortedvalues);
                }
            );
        })
});

router.get('/', function (req, res, next) {
    TableFeed.findAll({
        where: { feed_reader_id: req.session.user_id },
        attributes: [
            'feed_id'
        ],
        limit: 6
    })
        .then(tableFeed => {
            let arrayOfPromises = [];
            tableFeed.map((result, i) => {
                // console.log("result: " + result.post_feedid);
                let base_url = 'http://cloud.feedly.com//v3/streams/contents?streamId=' + result.feed_id;
                arrayOfPromises.push(
                    axios.get(base_url)
                        .then(response => (response.data.items))
                        .catch(error => console.log(error))
                );
            });

            Promise.all(arrayOfPromises).then(
                function (values) {
                    // console.log(values[0]);
                    // let targetvalues_0 = JSON.parse(JSON.stringify(values[0]));
                    // let targetvalues_1 = JSON.parse(JSON.stringify(values[1]));
                    // let result = Object.assign(targetvalues_0, targetvalues_1);
                    for (let i = 0; i < values.length - 1; i++) {
                        Array.prototype.push.apply(values[0], values[i + 1]);
                    }
                    // console.log("result: " + values[0]);
                    let sortedvalues = values[0];
                    sortedvalues.sort(function (b, a) {
                        return a["published"] - b["published"];
                    });
                    console.log(sortedvalues.slice(0, 3));
                    // res.json(sortedvalues.slice(0,3));
                    res.json(sortedvalues);
                }
            );
            // console.log(boardFeed.post_feedid);
            // let base_url = 'http://cloud.feedly.com//v3/streams/contents?streamId=' + boardFeed.post_feedid;
            // console.log(base_url);
            // axios.get(base_url)
            //     .then(response => res.json(response.data.items))
            //     .catch(error => console.log(error))
        })
});

router.get('/feedlist', function (req, res, next) {
    TableFeed.findAll({
        where: { feed_reader_id: req.session.user_id },
        attributes: [
            `feed_id`
        ]
    }).then(tableFeed => {
        res.json(tableFeed);
    })
});

router.get('/short', function (req, res, next) {

    if(typeof req.session.user_id === 'undefined'){
        return res.status(401).json({
            error: "THERE IS NO LOGIN DATA",
            code: 1
        });
    }
    
    TableFeed.findAll({
        where: { feed_reader_id: req.session.user_id },
        attributes: [
            'feed_id'
        ],
        limit: 6
    })
        .then(tableFeed => {
            let arrayOfPromises = [];
            tableFeed.map((result, i) => {
                // console.log("result: " + result.post_feedid);
                let base_url = 'http://cloud.feedly.com//v3/streams/contents?streamId=' + result.feed_id;
                arrayOfPromises.push(
                    axios.get(base_url)
                        .then(response => (response.data.items))
                        .catch(error => console.log(error))
                );
            });

            Promise.all(arrayOfPromises).then(
                function (values) {
                    // console.log(values[0]);
                    // let targetvalues_0 = JSON.parse(JSON.stringify(values[0]));
                    // let targetvalues_1 = JSON.parse(JSON.stringify(values[1]));
                    // let result = Object.assign(targetvalues_0, targetvalues_1);
                    for (let i = 0; i < values.length - 1; i++) {
                        Array.prototype.push.apply(values[0], values[i + 1]);
                    }
                    // console.log("result: " + values[0]);
                    let sortedvalues = values[0];
                    sortedvalues.sort(function (b, a) {
                        return a["published"] - b["published"];
                    });
                    // console.log(sortedvalues.slice(0, 5));
                    // res.json(sortedvalues.slice(0,3));
                    res.json(sortedvalues);
                }
            );
            // console.log(boardFeed.post_feedid);
            // let base_url = 'http://cloud.feedly.com//v3/streams/contents?streamId=' + boardFeed.post_feedid;
            // console.log(base_url);
            // axios.get(base_url)
            //     .then(response => res.json(response.data.items))
            //     .catch(error => console.log(error))
        })
});



router.post('/dirarticlemap', function (req, res, next) {
    let dir_id;

    // console.log(req.body.article_author);

    TableDirectory.findOne({
        where: { dir_name: req.body.dirId, owner_id: req.session.user_id },
        attributes: [
            'dir_id'
        ],
    }).then((response) => {
        // console.log(response.dir_id);
        dir_id = response.dir_id;
        const inputData = {
            article_originId: req.body.article_originId,
            article_url: req.body.articleId,
            article_author: req.body.article_author,
            article_content: req.body.article_content,
            article_title: req.body.article_title,
            dir_id: response.dir_id
        }

        // console.log(inputData);

        TableArticle.findOne({
            where: { article_url: req.body.articleId, dir_id: req.body.dirId }
        }).then((response) => {
                if (!response) {
                    TableArticle.create(inputData)
                        .then(artdirmap => {
                            // console.log(artdirmap);
                            console.log("dir article map success");
                        })
                        .catch(err => {
                            return res.send('error', err)
                        })
                }
            })
    });


});

export default router;