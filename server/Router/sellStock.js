const express = require("express");
const router = express.Router();
const sequelize = require("../models").sequelize;
const GameTable = require("../models/GameTable");

// 보유 주식 프론트로 보내줌.
router.get("/:usernickname", async function (req, res, next) {
  try {
    const usernickname = req.params.usernickname;

    var res_stock = await GameTable.findOne({ where: { usernickname } });

    res.send(res_stock);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

// 주식 파는 기능
router.post("/:usernickname", async (req, res, next) => {
  var { price, stock, company } = req.body;
  const usernickname = req.params.usernickname;

  try {
    var res_stock = await GameTable.findOne({ where: { usernickname } });
    var userstock = await res_stock.havestock;

    if (userstock[company] < stock) {
      res.send("보유주식이 없습니다.");
    } else {
      const sellresult = await GameTable.update(
        {
          havestock: sequelize.fn(
            "JSON_MERGE_PATCH",
            sequelize.col("havestock"),
            JSON.stringify({
              [company]: Number(res_stock.havestock[company]) - Number(stock),
            })
          ),
          money: res_stock.money + price * stock,
        },
        {
          where: { usernickname },
        }
      ).catch((err) => {
        console.log(err);
        res.send(404);
      });
      res.send("구매 완료");
    }
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

module.exports = router;
