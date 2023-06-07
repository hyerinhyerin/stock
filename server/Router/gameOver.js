const express = require("express");
const router = express.Router();

const sequelize = require("../models").sequelize;
const GameTable = require("../models/GameTable");

router.get('/', async (req, res) => {
    try {
        //const nickname = req.session.passport.user.nickname;
        const nickname = "ovo";
        GameTable.destroy({ where: { usernickname: nickname } });
    } catch (err) {
        res.send(err);
    }
});


module.exports = router;