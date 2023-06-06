const express = require("express");
const router = express.Router();
const User = require('../models/User');
const GameTable = require('../models/GameTable');

// 게임 시작할 때
router.get('/', async function (req, res, next) {
    try {
        const startNum = req.query.startNum;
        const nickname = req.session.passport.user.nickname;
        const startTime = new Date(new Date() * 1 + 3600000 * 9).toISOString().replace("T", " ").replace(/\..*/, "");

        User.findOne({
            where: { nickname: nickname }
        }).then(result => {
            if (startNum == 1) {
                console.log("1.");
                GameTable.create({
                    usernickname: result.nickname,
                    money: result.money,
                    havestock: {},
                    created_at: startTime
                });
                res.redirect("/gamePage");
            } else if (startNum == 2) {
                console.log("2.");
                GameTable.create({
                    usernickname: result.nickname,
                    money: 1000000,
                    havestock: {},
                    created_at: startTime
                });
            }
            res.redirect("/gamePage");
        }).catch(err => {
            console.log(err);
        });

    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

module.exports = router;