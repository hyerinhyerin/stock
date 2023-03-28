const express = require("express");
const router = express.Router();

const UserFindPw = require('../models/UserFindPw');
const User = require('../models/User');

router.get('/', async function (req, res, next) {
    try {
        res.send("selectPW");
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

const overPW = async () => {
    UserFindPw.count().then(async (result) => {
        while (result > 0) {
            await deletePW();
            await delay(5000);
        }
    });
}

const selectPW = async () => {
    const bodyCode = "HDJ192";
    const code = await UserFindPw.findOne({ raw: true, where: { email: "dbwjd20111@naver.com" } });
    if (code.code) {
        if (bodyCode == code.code) {
            User.update({ pw: "25" }, { where: { email: "dbwjd20111@naver.com" } });
        } else {
            console.log("입력하신 코드가 다릅니다. 다시 한번 입력해주세요");
        }
    } else {
        console.log("이메일을 다시 한번 확인해주세요");
    }
}

const deletePW = async () => {
    UserFindPw.findAll({ attributes: ['createdAt'] }).then((result) => {
        for (var i = 0; i < result.length; i++) {
            var now = new Date(new Date() * 1 + 3600000 * 9).toISOString().replace("T", " ").replace(/\..*/, "");
            var before = new Date(result[i].createdAt * 1 + 3600000 * 9).toISOString().replace("T", " ").replace(/\..*/, "");
            var timeDif = Math.trunc((new Date(now).getTime() - new Date(before).getTime()) / (1000 * 60));

            console.log(now);
            console.log(before);
            console.log(timeDif);

            if (timeDif >= 10) {
                UserFindPw.destroy({ where: { createdAt: result[i].createdAt } });
            }
        }
    }).catch((err) => {
        console.log(err);
    });
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = router;