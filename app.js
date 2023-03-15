const express = require("express");
const session = require("express-session");
const { sequelize } = require('./models');
const cp = require('cookie-parser');
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(__dirname + "/"));

app.use(bodyParser.urlencoded({ extended: false }));

// 세션(미들웨어)
app.use(
    session({
        secret: "loginData",
        resave: false,
        saveUninitialized: true,
        // store : new FileStore(),
    })
);

app.use(cp());

app.get('/', function (req, res) {
    res.send("안녕");
});

const stockprice = require("./route/stockprice");
app.use('/stockprice', stockprice);

const startGame = require("./route/startGame");
app.use('/startGame', startGame);

const find = require("./route/findPW");
app.use('/find', find);

const select = require("./route/selectPW");
app.use('/select', select);

const sell = require("./route/sellStock");
app.use('/sell', sell);

const buy = require("./route/buyStock");
app.use('/buy', buy);

app.listen(3001, function () {
    console.log('연결되었습니다.');
});