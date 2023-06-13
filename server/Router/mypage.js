const express = require("express");
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => { // 마이페이지 수정
    const { id, email, nickname } = req.body;

    try {
        await User.update({
            email: email,
            nickname: nickname
        }, { where: { id: id } });
    } catch (err) {
        res.send(err);
    }
})

router.get('/', async (req, res) => { // 마이페이지 정보 보냄
    try {
        const id = req.session.passport.user.id;
        console.log("session정보 : ", req.session);
        await User.findOne({ raw: true, where: { id: id } })
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
    const id = req.session.passport.user.id;
    try {
        const rank = await User.findAll({
            order: [['money', 'DESC']],
        });

        const userRank = [];

        for (const user of rank) {
            userRank.push(user.id);
        }
        res.send({ rank: userRank.indexOf(id) + 1 }); // 순위 보내줌.
    } catch (err) {
        res.send(err);
    }
});

// 탈퇴 기능
router.delete('/', async (req, res) => {
    try {
        const id = req.session.passport.user.id;

        User.destroy({ where: { id: id } })
            .then(() => {
                req.logout();
                req.session.destroy();
            });
    } catch (err) {
        res.send(err);
    }
})

router.get('/img', async (req, res) => {
    try {
        const id = req.session.passport.user.id;

        const img = await User.findOne({ attributes: ["img"], where: { id: id } });
        res.json({ img: img.img });
    } catch (err) {
        res.send(err);
    }
})

router.post('/img', async (req, res) => {
    try {
        const id = req.session.passport.user.id;
        const imgNum = req.query.imgNum;

        await User.update({
            img: Number(imgNum) - 1
        }, { where: { id: id } });
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;