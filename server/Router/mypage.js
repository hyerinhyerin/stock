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
    try {
        const nickname = req.session.passport.user.nickname;
        await User.findOne({ raw: true, where: { nickname: nickname } })
            .then((result) => {
                res.send({ userData: result });
            }).catch((err) => {
                res.send(err);
            })
    } catch (err) {
        res.send(err);
    }
});

router.get('/rank', async (req, res) => { // 보유자산 순위
    const nickname = req.session.passport.user.nickname;
    try {
        const rank = await User.findAll({
            order: [['money', 'DESC']],
        });

        const userRank = [];

        for (const user of rank) {
            userRank.push(user.nickname);
        }
        res.send({ rank: userRank.indexOf(nickname) + 1 }); // 순위 보내줌.
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;