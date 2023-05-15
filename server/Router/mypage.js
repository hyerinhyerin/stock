const express = require("express");
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => { // 마이페이지 수정
    const session = req.session;
    const { id, email, nickname } = req.body;

    try {
        await User.update({
            email: email,
            nickname: nickname
        }, { where: { id: id } })
        res.send("마이페이지 수정 완료");
    } catch (err) {
        res.send(err);
    }
})

router.get('/', async (req, res) => { // 마이페이지 정보 보냄
    const session = req.session;
    try {
        if (session.isLogined == true) {
            await User.findOne({ raw: true, where: { nickname: session.nickname } })
                .then((result) => {
                    res.send(result);
                }).catch((err) => {
                    res.send(err);
                })
        } else {
            res.send("로그인 안함");
        }
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;