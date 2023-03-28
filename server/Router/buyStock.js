const express = require("express");
const router = express.Router();
const Company = require('../models/Company');
const GameTable = require('../models/GameTable');

var result;


// join(user, company) -> 해당 내용 result에 값을 담아서 update 같이 해주기.
router.get('/:num', async (req, res) => {
    try {
        const num = req.params.num;
        result = await Company.findOne({ where: { num } });

        res.send(result);
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

// SELECT c.num, c.stockprice, c.companystock, u.usernickname, u.money, u.havestock

// FROM gametable u

// JOIN gamecompany c

// where u.usernickname = "ovo" && c.num = 1;

// 주식 사는 기능
router.post('/:usernick', async (req, res) => {
    const { stock, price, company } = req.body;
    const usernick = req.params.usernick;

    try {
        const buyresult = GameTable.update(
            { havestock: { ...havestock, [company]: stock }, money: result.money - (price * stock) },
            { where: { usernickname: usernick } }
        ).catch(err => {
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

