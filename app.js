const express = require("express");
const session = require("express-session");
//const path = require("path");

const app = express();

app.use(express.static(__dirname + "/"));

// 세션(미들웨어)
app.use(
    session({
        secret : "loginData",
        resave : false,
        saveUninitialized : true,
        // store : new FileStore(),
    })
);

app.get('/', function(req, res) {
    res.send("안녕");
});

const stockprice = require("./route/stockprice");
app.use('/stockprice', stockprice);

app.listen(3001, function(){
    console.log('연결되었습니다.');
});