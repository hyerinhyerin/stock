const express = require("express");
const router = express.Router();
const sequelize = require('../models').sequelize;
const axios = require('axios');
const Sequelize = require("sequelize");
const path = require("path");
const { QueryTypes, INTEGER } = require("sequelize");
const Company = require('../models/Company');
const { type } = require("os");


var showresult = {
    companystock: 0,
    stockprice: 0
}

var userdata = {
    money: 0,
    userStock: 0
}

const showPrice = async (company, dbnum) => {
    const query = 'select companystock, stockprice from gamecompany where num = ?';

    await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: [company],
    }).then((result) => {
        showresult.companystock = result[0].companystock;
        showresult.stockprice = result[0].stockprice;
    })
};

router.get('/', async function (req, res, next) { // 나중에 값 전달해줘야 함.(프론트로)
    try {
        await showPrice(1, 1);
        //buyStock(1, 1);
        res.send(html(0, showresult.stockprice));
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

const showStock = async (company, dbnum) => {
    //var { price, stock, dePrice } = req.body;
    //const query = 'select * from gamestock' + dbnum + ' where num = ?';
    const query = 'select * from gamecompany where num = ?';

    await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: [company],
    }).then((result) => {
        price = result[0].stockprice;
        // if (stock.value > companystock) {
        //     console.log("더이상 살 수 없습니다.");
        // } else if (result[0].companystock == 0) {
        //     console.log("더이상 살 수 없습니다.2");
        // }
    });
}

const showUser = async (dbnum, nickname) => {
    const query = 'select * from gametable' + dbnum + ' where nickname = ?';

    await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: [nickname]
    }).then((result) => {
        userdata.money = result[0].money;
        userdata.userStock = result[0].userStock;
    });
}

const buyStock = async (company, dbnum, stock, dePrice, userStock) => {
    const query2 = 'update gametable' + dbnum + ' SET money = :newMoney, userStock = JSON_MERGE_PATCH( userStock, :newStocks) WHERE nickname = :newNickname';

    await sequelize.query(query2, {
        type: QueryTypes.UPDATE,
        replacements: {
            newMoney: userdata.money - dePrice,
            newStocks: JSON.stringify({ [company]: stock }),
            newNickname: 'oxo'
        }
    });
}

router.post('/buyTest', async (req, res) => {
    const { stock, price, dePrice } = req.body;
    try {
        await showUser(1, "oxo");
        await buyStock(2, 1, stock, dePrice, userdata.userStock);
        res.redirect("/buy");
    } catch (err) {
        console.log(err);
        res.send(404);
    }
})



const html = (stock, price) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <form method="post" action="/buy/buyTest">
        <input name="stock" id="stock" value = "${stock}"> 주
        <input type="button" name="stockUP" id="stockUP" value="+">
        <input type="button" name="stockDown" id="stockDown" value="-">
        <br>
        <input name="price" id="price" value = "${price}"> 원
        <input type="button" name="priceUP" id="priceUP" value="+">
        <input type="button" name="priceDown" id="priceDown" value="-">
        <br>
        주문금액
        <input name="dePrice" id="dePrice"> 원
        <br>
        <input type="submit" value="매수" /> <input type="button" name="auto" id="auto" value="자동">
    </form>


    <script>
        const stock = document.getElementById('stock');
        const stockUP = document.querySelector("#stockUP");
        const stockDown = document.querySelector("#stockDown");

        stockUP.addEventListener("click", () => {
            stock.value = Number(stock.value) + 1;
        });
        stockDown.addEventListener("click", () => {
            stock.value = Number(stock.value) - 1;
        });

        const price = document.querySelector("#price");
        const priceUP = document.querySelector("#priceUP");
        const priceDown = document.querySelector("#priceDown");

        priceUP.addEventListener("click", () => {
            price.value = Number(price.value) + 10;
        });

        priceDown.addEventListener("click", () => {
            price.value = Number(price.value) - 10;
        });

        const dePrice = document.querySelector("#dePrice");
        const auto = document.querySelector("#auto");
        auto.addEventListener("click", () => {
            dePrice.value = Number(stock.value) * Number(price.value);
        });
    </script>
</body>

</html>`;





module.exports = router;

