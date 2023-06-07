const express = require("express");
const router = express.Router();

const GameTable = require("../models/GameTable");
const User = require("../models/User");

router.get('/', async (req, res) => {
    try {
        const nickname = req.session.passport.user.nickname;
        var gameTable = await GameTable.findOne({ where: { usernickname: nickname } });

        await User.update({ money: gameTable.money }, { where: { nickname: nickname } })
            .then(() => {
                GameTable.destroy({ where: { usernickname: nickname } });
            });
    } catch (err) {
        res.send(err);
    }
});


module.exports = router;