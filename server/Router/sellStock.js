const express = require("express");
const router = express.Router();
const path = require("path");
const Company = require('../models/Company');

router.get('/', async function (req, res, next) { // 나중에 값 전달해줘야 함.(프론트로)
    try {
        res.send("sellStock");
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

router.post('/sellTest', async (req, res, next) => {
    var { price, stock, dePrice } = req.body;
    try {

    } catch (err) {
        console.log(err);
        res.send(404);
    }
})






module.exports = router;