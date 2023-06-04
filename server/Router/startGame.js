const express = require("express");
const router = express.Router();
const User = require("../models/User");
const GameTable = require("../models/GameTable");

// 게임 시작할 때
router.get("/", async function (req, res, next) {
  try {
    const session = req.session;
    session.nickname = "hello";

    const startTime = await new Date(new Date() * 1 + 3600000 * 9)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "");

    await User.findOne({
      raw: true,
      where: { nickname: session.nickname },
    })
      .then((result) => {
        GameTable.create({
          usernickname: result.nickname,
          money: result.money,
          havestock: {},
          created_at: startTime,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    res.send("startGame");
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

module.exports = router;
