const express = require("express");
const { INTEGER } = require("sequelize");
const router = express.Router();
const Company = require('../models/Company');
const sequelize = require('../models').sequelize;
const GameTable = require('../models/GameTable');

var res_com;

// 회사 주가 불러옴.
router.get('/:num', async (req, res) => {
    try {
        const num = req.params.num;
        res_com = await Company.findOne({ where: { num } });
        res.send(res_com);
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

// 주식 사는 기능
router.post('/:usernick', async (req, res) => {
    const { stock, price, company } = req.body;
    const usernick = req.params.usernick;

    try {
        var res_user = await GameTable.findOne({ where: { usernickname: usernick } });

        const buyresult = await GameTable.update({
            havestock: sequelize.fn('JSON_MERGE_PATCH', sequelize.col("havestock"), JSON.stringify({ [company]: Number(res_user.havestock[company]) + Number(stock) })),
            money: res_user.money - (price * stock)
        }, {
            where: { usernickname: usernick }
        }).catch(err => {
            console.log(err);
            res.send(404);
        });

        res.send("test");
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

module.exports = router;

