const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const sequelize = require("../models").sequelize;
const GameTable = require("../models/GameTable");

// 주식 사는 기능
router.post("/", async (req, res) => {
  const { stock, price, company } = req.body;
  var usernick = req.query.usernick;

  try {
    var res_user = await GameTable.findOne({
      where: { usernickname: usernick },
    });

    if (res_user.havestock && res_user.havestock[company] != null) {
      // json 파일 -> key 값이 있을 때
      console.log("있음");
      const buySecond = await GameTable.update(
        {
          havestock: sequelize.fn(
            "JSON_MERGE_PATCH",
            sequelize.col("havestock"),
            JSON.stringify({
              [company]: Number(res_user.havestock[company]) + Number(stock),
            })
          ),
          money: res_user.money - price * stock,
        },
        {
          where: { usernickname: usernick },
        }
      ).catch((err) => {
        console.log(err);
        res.send(404);
      });
    } else {
      // json 파일 -> key 값이 없을 때
      console.log("없음");
      await GameTable.update(
        {
          havestock: sequelize.fn(
            "JSON_MERGE_PATCH",
            sequelize.col("havestock"),
            JSON.stringify({ [company]: Number(stock) })
          ),
          money: res_user.money - price * stock,
        },
        {
          where: { usernickname: usernick },
        }
      ).catch((err) => {
        console.log(err);
        res.send(404);
      });
    }

    var companyStock = await Company.findOne({ where: { num: company } });

    const updateDB = await Company.update(
      {
        companystock: companyStock.companystock - Number(stock),
      },
      { where: { num: company } }
    );

    const gamingUser = await GameTable.findOne({
      where: {
        usernickname: usernick,
      },
    });
    if (gamingUser) {
      return res.json(gamingUser);
    } else {
      return res.send("세션 데이터가 존재하지 않습니다.");
    }
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

module.exports = router;
