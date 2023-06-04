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

// 주식 파는 기능
router.post("/", async (req, res, next) => {
  var { price, stock, company } = req.body;
  const usernick = req.query.usernick;

  try {
    var re_price = Number(price.replace(/,/g, ""));
    var res_stock = await GameTable.findOne({
      where: { usernickname: usernick },
    });
    var userstock = await res_stock.havestock;

    // 갖고 있는 주식이 팔고 싶은 주식보다 적으면
    if (parseInt(userstock[company]) < parseInt(stock)) {
      res.send("보유주식이 없습니다.");
    } else {
      const sellStock = await GameTable.update(
        {
          havestock: sequelize.fn(
            "JSON_MERGE_PATCH",
            sequelize.col("havestock"),
            JSON.stringify({
              [company]: Number(res_stock.havestock[company]) - Number(stock),
            })
          ),
          money: res_stock.money + re_price * stock,
        },
        {
          where: { usernickname: usernick },
        }
      ).catch((err) => {
        console.log(err);
        res.send(404);
      });

      var companyStock = await Company.findOne({ where: { num: company } });

      const updateDB = await Company.update(
        {
          companystock: companyStock.companystock + Number(stock),
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
    }
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

module.exports = router;
