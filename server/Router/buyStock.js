const express = require("express");
const router = express.Router();
const Company = require('../models/Company');
const sequelize = require('../models').sequelize;
const GameTable = require('../models/GameTable');

// 주식 사는 기능
router.post('/', async (req, res) => {
    const { stock, price, company } = req.body;
    const usernick = req.query.usernick;

    try {
        var res_user = await GameTable.findOne({ where: { usernickname: usernick } });

        if (res_user.havestock[company] == null) { // json 파일 -> key 값이 없을때
            const buyFirst = await GameTable.update({
                havestock: sequelize.fn('JSON_MERGE_PATCH', sequelize.col("havestock"), JSON.stringify({ [company]: Number(stock) })),
                money: res_user.money - (price * stock)
            }, {
                where: { usernickname: usernick }
            }).catch((err) => {
                console.log(err);
                res.send(404);
            });
        } else { // json 파일 -> key 값이 있을 때
            const buySecond = await GameTable.update({
                havestock: sequelize.fn('JSON_MERGE_PATCH', sequelize.col("havestock"), JSON.stringify({ [company]: Number(res_user.havestock[company]) + Number(stock) })),
                money: res_user.money - (price * stock)
            }, {
                where: { usernickname: usernick }
            }).catch(err => {
                console.log(err);
                res.send(404);
            });
        }

        var companyStock = await Company.findOne({ where: { num: company } });

        const updateDB = await Company.update({
            companystock: companyStock.companystock - Number(stock)
        }, { where: { num: company } });

        res.send("구매 완료");
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

module.exports = router;

