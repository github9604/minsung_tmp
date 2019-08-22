import express from 'express';
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

router.use(cors());

const MemberLogin = sequelize.define(
    'memberLogin',
    {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_pw: {
            type: Sequelize.STRING
        },
        group_id: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_user'
    }
);

router.post('/logout', (req, res) => {
    console.log("destroy session 로그아웃");
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ sucess: true });
});


router.get('/getinfo', (req, res) => {
    if(typeof req.session.user_id === "undefined"){
        return res.status(401).json({
            error: "THERE IS NO LOGIN DATA",
            code: 1
        });
    }
    res.json({info: req.session.user_id});
});

router.post('/signin', (req, res) => {
    const memberData = {
        user_id: req.body.user_id,
        user_pw: req.body.user_pw
    };
    console.log(memberData);

    MemberLogin.findOne({
        where: { user_id: req.body.user_id }
    })
        .then(memberLogin => {
            if (!memberLogin) {
                return res.status(401).json({
                    error: "존재하지 않는 사용자",
                    code: 2
                });
            }
            if (req.body.user_pw === memberLogin.user_pw) {
                console.log("express 로그인 성공");
                let hour = 3600000;
                req.session.user_id = req.body.user_id;
                req.session.group_id = memberLogin.group_id;
                res.cookie("group_id", memberLogin.group_id,{
                    expires: new Date(Date.now() + hour)
                });
                return res.json({
                    success: true
                });
            } else {
                console.log("express 로그인 실패");
                return res.status(401).json({
                    error: "비밀번호 오류",
                    code: 3
                });
            }
        });
});

export default router;