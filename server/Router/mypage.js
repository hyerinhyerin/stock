const express = require("express");
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const session = req.session;
    const inputValue = req.body.value;

    session.isLogined = true;
    session.nickname = inputValue;
    res.send("성공");
})

router.get('/', async (req, res) => {
    const { email, id } = req.body;
    const session = req.session;
    try {
        console.log(session.nickname);
        if (session.isLogined == true) {
            await User.findOne({ raw: true, where: { nickname: session.nickname } })
                .then((result) => {
                    res.send(result);
                }).catch((err) => {
                    res.send(err);
                })
        } else {
            res.send("로그인 안함");
        }
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;