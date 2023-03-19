const express = require("express");
const router = express.Router();

const UserFindPw = require('../models/UserFindPw');
const User = require('../models/User');

router.get('/', async function (req, res, next) {
    try {
        await UserFindPw.findOne({ raw: true, where: { id: "dbwjd" } }).then((result) => {
            var now = new Date(new Date() * 1 + 3600000 * 9).toISOString().replace("T", " ").replace(/\..*/, "");
            var before = new Date(result.createdAt * 1 + 3600000 * 9).toISOString().replace("T", " ").replace(/\..*/, "");

            console.log(now);
            console.log(before);
            const timeDif = Math.trunc((new Date(now).getTime() - new Date(before).getTime()) / (1000 * 60));

            if (timeDif > 10) {
                UserFindPw.destroy({ where: { id: "dbwjd" } });
            }
        }).catch((err) => {
            console.log(err);
        });
        res.send("selectPW");
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});


module.exports = router;