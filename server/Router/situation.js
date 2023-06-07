const express = require("express");
const router = express.Router();

const Company = require("../models/Company");
const Situation = require("../models/Situation");
const { Op } = require("sequelize");
const random = require("./random");

router.get("/", async function (req, res, next) {
  try {
    var randomNum = req.query.num;

    if (!randomNum) {
      // 상황이 없을 경우 모든 회사가 랜덤으로 주가 변동
      randomPrice();
      res.send({ situationJudgment: false });
    } else {
      // 상황이 주어지면 해당 회사는 정해진대로 주가 변동 / 나머지 회사는 랜덤 주가 변동
      situationDB(randomNum);
      Situation.findOne({ raw: true, where: { num: randomNum } })
        .then((result) => {
          res.send({ situation: result, situationJudgment: true });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  } catch (err) {
    console.log(err);
    res.send(404);
  }
});

var numList = [];
var opList = [];

// 상황에 따른 주가 변경 기능
function situationDB(num) {
  Situation.findOne({ raw: true, where: { num: num } })
    .then((result) => {
      if (result.upcompany) {
        if (result.upcompany.includes(",")) {
          numList = result.downcompany.split(",");
          opList.push("+");
        } else {
          numList.push(result.upcompany);
          opList.push("+");
        }
      } else if (result.downcompany) {
        if (result.downcompany.includes(",")) {
          numList = result.downcompany.split(",");
          opList.push("-");
        } else {
          numList.push(result.downcompany);
          opList.push("-");
        }
      } else if (result.updown) {
        if (result.updown.includes(",")) {
          numList = result.downcompany.split(",");
          opList.push("+");
          opList.push("-");
        } else {
          numList.push(result.updown);
          opList.push("+");
          opList.push("-");
        }
      } else if (result.downup) {
        if (result.downup.includes(",")) {
          numList = result.downcompany.split(",");
          opList.push("-");
          opList.push("+");
        } else {
          numList.push(result.downup);
          opList.push("-");
          opList.push("+");
        }
      }
    })
    .then(() => {
      if (opList.length > 1) {
        for (var i = 0; i < numList.length; i++) {
          for (var j = 0; j < opList.length; j++) {
            findDB(numList[i], opList[j]);
          }
        }
      } else {
        for (var i = 0; i < numList.length; i++) {
          findDB(numList[i], opList);
        }
      }
      randStock(numList);
      numList = [];
      opList = [];
    })
    .catch((err) => {
      console.log(err);
    });
}

// 상황에 따른 회사 찾기 기능
function findDB(DBNum, DBop) {
  var afterPrice = 0;
  Company.findOne({
    attributes: ["stockprice"],
    raw: true,
    where: { num: DBNum },
  })
    .then((result) => {
      afterPrice = eval(
        result.stockprice + DBop + random.startNum(result.stockprice)
      );
      if (afterPrice < 0) {
        DBop = "+";
        afterPrice = eval(0 + DBop + random.retryNum(result.stockprice));
      }
    })
    .then(() => {
      Company.update(
        { stockprice: parseInt(afterPrice) },
        { where: { num: DBNum } }
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

function randStock(sitNum) {
  // 상황 때문에 주가 변동되는 회사빼고 나머지는 랜덤 주가 변동 기능 함수
  var afterPrice = [];

  Company.findAll({
    attributes: ["stockprice"],
    raw: true,
    where: { num: { [Op.notIn]: sitNum } },
  })
    .then((result) => {
      for (let i in result) {
        var rand_price = eval(
          result[i].stockprice +
            random.startOp() +
            random.startNum(result[i].stockprice)
        );
        if (rand_price < 0) {
          rand_price = eval(
            result[i].stockprice + "+" + random.startNum(result[i].stockprice)
          );
        }
        afterPrice.push(rand_price);
      }
    })
    .then(() => {
      for (let i = 0; i < afterPrice.length; i++) {
        Company.update(
          { stockprice: parseInt(afterPrice[i]) },
          { where: { num: i + 1 } }
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 랜덤으로 모든 회사 주가가 변동되는 함수 반복 실행.
function randomPrice() {
  var afterPrice = [];

  Company.findAll({ attributes: ["stockprice"], limit: 5 })
    .then((result) => {
      for (let i in result) {
        var rand_price = eval(
          result[i].stockprice +
            random.startOp() +
            random.startNum(result[i].stockprice)
        );
        if (rand_price < 0) {
          rand_price = eval(
            result[i].stockprice + "+" + random.startNum(result[i].stockprice)
          );
        }
        afterPrice.push(rand_price);
      }
    })
    .then(() => {
      for (let i = 0; i < afterPrice.length; i++) {
        Company.update(
          { stockprice: parseInt(afterPrice[i]) },
          { where: { num: i + 1 } }
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = router;
