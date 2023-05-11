const { query } = require("express");
const express = require("express");
const router = express.Router();
const sequelize = require('../models').sequelize;
const { QueryTypes } = require("sequelize");

var sellUser = {
    userNick: "",
    userMoney: "",
    userStock: "",
}

async function selectMoney(dbnum, nick, company) {
    const query = 'select * from gametable' + dbnum + ' where nickname = ?';

    await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: [nick],
    }).then(async (result) => {
        sellUser.userMoney = await result[0].money;
        sellUser.userStock = await result[0].userStock[company]; // json 형식 -> object[key]로 값 반환
    });
}

router.get('/', async function (req, res, next) { // 나중에 값 전달해줘야 함.(프론트로)
    try {
        const session = req.session;
        session.nickname = "oxo";
        session.gamedb = 1;
        sellUser.userNick = session.nickname;
        selectMoney(session.gamedb, sellUser.userNick, 1);
        res.send("sell");
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

router.post('/sellTest', async (req, res, next) => {
    var { price, stock, company } = req.body;
    try {
        const session = req.session;

        const query2 = 'update gametable' + session.gamedb + ' SET money = :newMoney, userStock = JSON_MERGE_PATCH( userStock, :newStocks) WHERE nickname = :newNickname';

        if (sellUser.userStock < stock) {
            res.send("살 수 없다.");
        } else {
            await sequelize.query(query2, {
                type: QueryTypes.UPDATE,
                replacements: {
                    newMoney: sellUser.userMoney + (price * stock),
                    newStocks: JSON.stringify({ [company]: (sellUser.userStock - stock) }),
                    newNickname: session.nickname
                }
            });
            res.send("구매 완료");
        }


    } catch (err) {
        console.log(err);
        res.send(404);
    }
})






module.exports = router;