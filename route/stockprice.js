const express = require("express");
const db = require('./db');
const random = require('./random');
const router = express.Router();

router.get('/', function(req, res, next){
    try{

        const test = "SELECT stockprice FROM gamecompany";
        var randomNum = random.randomNum();
        var test2;

        db.query(test, function(err, results){
            var stockPrice = [];
            for (var i of results){
                stockPrice.push(i.stockprice);
            };

            if(err){
                console.log(err);   
            } else {
                var afterPrice = [];
                for(var i = 0; i<stockPrice.length; i++){
                    test2 = eval(stockPrice[i] + random.randomOperation() + randomNum);
                    afterPrice.push(test2);                    
                }
                for(var i = 0; i<afterPrice.length; i++){
                    db.query("UPDATE testtable set stockprice = ? where num = '" + (i+1) + "' ",[afterPrice[i]],(err, results, fields)=>{
                        
                    });                    
                }
            }
        });
        
        res.send("안녕");

    } catch (err){
        res.send(404);
    }
});

module.exports = router;

