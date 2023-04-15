const express = require("express");
const router = express.Router();
const smtpTransport = require('../config/email.json');
const nodemailer = require('nodemailer');
const sequelize = require('../models').sequelize;

const UserFindPw = require('../models/UserFindPw');
const User = require('../models/User');
const { where } = require("sequelize");

router.get('/', async function (req, res, next) {
    try {
        User.findOne({ attributes: ['nickname', 'id', 'email'], raw: true, where: { email: 'dbwjd20111@naver.com' } })
            .then((result) => {
                if (!result) {
                    console.log("등록된 이메일 주소가 아닙니다. 다시 한번 확인해주세요!");
                } else {
                    sendEmail(result.email, result.nickname, result.id, createCode());
                }
            })
            .catch((err) => {
                console.log(err);
            })



        res.send("findPW");

    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

const createCode = () => { // 랜덤으로 비밀번호 인증 코드 생성
    var code = "";
    const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++) {
        code += text.charAt(Math.floor(Math.random() * text.length));
    }

    return code;
}

const sendEmail = async (user_email, user_nickname, user_id, code) => {
    try {
        const transporter = await nodemailer.createTransport({
            service: 'gamil',
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: smtpTransport.user,
                pass: smtpTransport.pass
            }
        });

        const mailOptions = await {
            from: `"<stock U&D>"`,
            to: user_email,
            subject: '<stock U&D> 비밀번호 찾기 인증',
            html: `
            <div>
                <h2><stock U&D> 비밀번호 찾기 인증</h2>
                <div> ${user_nickname}고객님이 요청하신 비밀번호 찾기 인증 이메일 입니다. </div>
                <div> 인증 번호 : ${code} </div>
                
                <br><br>
                <div style = "position: absolute; right:20px;"> [stock U&D] </div>
            </div>
            `
        }
        await transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error);
            } else {
                const query = 'insert into user_findpw (id, email, code, createdAt) values ("' + user_id + '","' + user_email + '","' + code + '", NOW()) on duplicate key update code = "' + code + '" , createdAt = NOW()';
                await sequelize.query(query);
            }
            transporter.close();
        });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = router;