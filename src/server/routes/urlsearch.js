import express from 'express';
import axios from 'axios';
import Sequelize from 'sequelize';

const router = express.Router();
const cors = require("cors");

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

router.use(cors());

router.post('/', function (req, res, next) {
    // console.log(typeof(req.body.obj));
    let wow = encodeURI(req.body.obj);
    console.log(wow);
    let set_button = [];
    // console.log(name);
    let base_url = 'http://cloud.feedly.com/v3/search/feeds?locale=ko&count=40&query=' + wow;
    axios.get(base_url)
        .then((response) => {
            Promise.all(
                response.data.results.map(
                    async (result,i) => {
                        await TableFeed.findOne({
                            where: { feed_id: result.feedId }
                        }).then((check) => {
                            if (check) set_button[i] = '1';
                            else set_button[i] = '0';
                        })
                        if(i==39) res.json({whole: response.data.results, btn: set_button})
                    }
                )
            )
        })
    // axios.get(base_url)
    //     .then(response => res.json(response.data.results))
});

router.post('/insertFeed', function (req, res, next) {
    console.log(req.body.insert_results);
    let inputResult = req.body.insert_results;
    const inputData = {
        feed_id: inputResult.feedId,
        feed_icon: inputResult.iconUrl,
        feed_description: inputResult.description,
        feed_name: inputResult.websiteTitle,
        feed_topics: inputResult.topics,
        feed_reader_id: req.session.user_id
    };
    // console.log(inputData);
    TableFeed.findOne({
        where: { feed_id: inputResult.feedId, feed_reader_id: req.session.user_id }
    }).then(tableFeed => {
        if (!tableFeed) {
            TableFeed.create(inputData)
                .then(articleInput => {
                    // console.log(articleInput);
                    res.json({ 'has_scrapped': !tableFeed });
                    console.log("Feed input success");
                }).catch(err => {
                    return res.send('error' + err)
                })
        }
        else {
            TableFeed.destroy({
                where: { feed_id: inputResult.feedId, feed_reader_id: req.session.user_id }
            })
                .then(response => {
                    res.json({ has_scrapped: !tableFeed });
                })
                .catch(err => console.log("error" + err));
        }
    })

});

router.post('/scrap', function (req, res) {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }
});


export default router;