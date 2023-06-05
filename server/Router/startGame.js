const express = require("express");
const router = express.Router();
const User = require('../models/User');
const GameTable = require('../models/GameTable');

// 게임 시작할 때
router.get('/', async function (req, res, next) {
    try {
        const startNum = await req.query.startNum;
        const nickname = await req.session.passport.user.nickname;
        const startTime = await new Date(new Date() * 1 + 3600000 * 9).toISOString().replace("T", " ").replace(/\..*/, "");

        await User.findOne({
            where: { nickname: nickname }
        }).then(result => {
            console.log("여기까지옴.");
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