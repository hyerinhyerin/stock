const express = require("express");
const database = require('./database');
const router = express.Router();

router.get('/', function(req, res, next){
    res.send('데베 확인');

    const test = "SELECT * FROM user";

    database.query(test, function(err, results, fields){
        if(err){
            console.log(err);
        }
        console.log(results);
    })
});

module.exports = router;