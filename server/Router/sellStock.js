const express = require("express");
const app = express();
const multer = require("multer");
const router = express.Router();
const sequelize = require("../models").sequelize;
const GameTable = require("../models/GameTable");
const Company = require("../models/Company");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

// 주식 파는 기능(매도)
router.post("/", async (req, res, next) => {
  var { price, stock, company } = req.body;
  //const nickname = req.session.passport.user.nickname;
  const nickname = "ovo";
  price = price.replace(/,/g, "");

  try {
    var res_stock = await GameTable.findOne({
      where: { usernickname: nickname },
    });
    var userstock = res_stock.havestock;

    console.log(price, stock, company);

    // 갖고 있는 주식이 팔고 싶은 주식보다 적으면
    if (parseInt(userstock[company]) < parseInt(stock)) {
      return res.send("매도하려는 주식의 수가 소유 주식보다 많습니다.");
    } else if (!userstock[company]) {
      return res.send("보유 주식이 없습니다.");
    } else {
      await GameTable.update(
        {
          havestock: sequelize.fn(
            "JSON_MERGE_PATCH",
            sequelize.col("havestock"),
            JSON.stringify({
              [company]: Number(res_stock.havestock[company]) - Number(stock),
            })
          ),
          money: parseInt(res_stock.money) + parseInt(price) * parseInt(stock),
        },
        {
          where: { usernickname: nickname },
        }
      ).catch((err) => {
        console.log(err);
        res.send(404);
      });

      await Company.findOne({ where: { num: company } })
        .then((result) => {
          Company.update(
            {
              companystock: result.companystock + Number(stock),
            },
            { where: { num: company } }
          );
        });

      const gamingUser = await GameTable.findOne({
        where: {
          usernickname: nickname,
        },
      });
      if (gamingUser) {
        return res.json(gamingUser);
      } else {
        return res.send("세션 데이터가 존재하지 않습니다.");
      }
    }
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

module.exports = router;
