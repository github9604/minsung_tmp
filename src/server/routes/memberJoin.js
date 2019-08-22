import express from 'express';
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

const MemberJoin = sequelize.define(
    'memberJoin',
    {
        user_id: {
            type:Sequelize.INTEGER,
            primaryKey: true
        },
        user_pw:{
            type: Sequelize.STRING
        },
        group_id: {
            type:Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_user'
    }
);

router.use(cors());

router.post('/signup', (req, res) => {

    const memberData = {
        user_id: req.body.user_id,
        user_pw: req.body.user_pw,
        group_id: req.body.group_id
    };
    console.log(memberData);

    MemberJoin.findOne({
        where:{user_id: req.body.user_id}})
        .then(memberJoin => {
            if(!memberJoin){
                MemberJoin.create(memberData)
                .then(memberJoin => {
                    console.log("회원가입 성공");
                    console.log(user_id);
                    res.cookie("group_id", group_id, {
                        expires: new Date(Date,now() + 900000)
                    });
                    return res.json({success: true})
                })
                .catch(err => {
                    return res.send('error' + err)
                })
            }
            else{
                console.log("회원가입 실패");
                return res.json({
                    error: "이미 있는 ID",
                    code: 3
                })
            }
        })
        .catch(err => {
            return res.send('error' + err)
        })
});

router.post('/logout', (req, res) => {

    return res.json({success: true});
});

export default router;