const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const sequelize = require("../models").sequelize;
const GameTable = require("../models/GameTable");
const User = require("../models/User");
const { where } = require("sequelize");

// 주식 사는 기능(매수)
router.post("/", async (req, res) => {
  try {
    var { stock, price, company } = req.body;
    const id = req.session.passport.user.id;
    price = price.replace(/,/g, "");

    const user = await User.findOne({ attributes: ["nickname"], where: { id: id } });
    const nickname = user.nickname;

    var res_user = await GameTable.findOne({
      where: { usernickname: nickname },
    });
    var company_data = await Company.findOne({ where: { num: company } });

    if (company > company_data.companystock) {
      return res.write("<script>alert('해당 주식만큼 회사 주식이 없습니다.')");
    }
    if (Number(price * stock) > res_user.money) {
      return res.write("<script>alert('유저의 돈이 없습니다. 다시 확인해주세요')");
    }

    // json 파일 -> key 값이 있을 때
    if (res_user.havestock && res_user.havestock[company] != null) {
      await GameTable.update(
        {
          havestock: sequelize.fn(
            "JSON_MERGE_PATCH",
            sequelize.col("havestock"),
            JSON.stringify({
              [company]: Number(res_user.havestock[company]) + Number(stock),
            })
          ),
          money: parseInt(res_user.money) - parseInt(price) * parseInt(stock),
        },
        { where: { usernickname: nickname } }
      ).catch((err) => {
        res.send(err);
      });
    } else {
      // json 파일 -> key 값이 없을 때
      await GameTable.update(
        {
          havestock: sequelize.fn(
            "JSON_MERGE_PATCH",
            sequelize.col("havestock"),
            JSON.stringify({ [company]: Number(stock) })
          ),
          money: parseInt(res_user.money) - parseInt(price) * parseInt(stock),
        },
        { where: { usernickname: nickname } }
      ).catch((err) => {
        console.log(err);
        res.send(404);
      });
    }

    await Company.findOne({ where: { num: company } }).then((result) => {
      Company.update(
        { companystock: parseInt(result.companystock - Number(stock)) },
        { where: { num: company } }
      );
    });

    const gamingUser = await GameTable.findOne({
      where: {
        usernickname: nickname,
      },
    });

    if (gamingUser) {
      return res.json({ gamingUser, stock });
    } else {
      return res.send("세션 데이터가 존재하지 않습니다.");
    }
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

module.exports = router;
