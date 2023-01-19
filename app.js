const express = require("express");

const app = express();

app.get('/', function(req, res) {
    res.send("안녕");
});

app.listen(3001, function(){
    console.log('연결되었습니다.');
});