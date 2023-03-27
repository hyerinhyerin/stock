const express = require("express");
const random_price = require('./random_price');
//const situation = require('./situation');
const router = express.Router();

router.get('/', function (req, res, next) {
    try {
        random_price.startRandom();
        setTimeout(function () {
            random_price.stopRandom();
        }, 5000);

        res.send("stockprice");

    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

module.exports = router;

