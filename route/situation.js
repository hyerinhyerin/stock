const Company = require('../models/Company');
const Situation = require('../models/Situation');
const { Op } = require("sequelize");
const random = require('./random');

var numList = [];
var opList = [];

// 상황에 따른 주가 변경 기능

function situationDB(num) {
    Situation.findOne({ raw: true, where: { num: num } })
        .then((result) => {
            if (result.upcompany) {
                if (result.upcompany.includes(',')) {
                    numList = result.downcompany.split(',');
                    opList.push("+");
                } else {
                    numList.push(result.upcompany);
                    opList.push("+");
                }
            }
            else if (result.downcompany) {
                if (result.downcompany.includes(',')) {
                    numList = result.downcompany.split(',');
                    opList.push("-");
                } else {
                    numList.push(result.downcompany);
                    opList.push("-");
                }
            }
            else if (result.updown) {
                if (result.updown.includes(',')) {
                    numList = result.downcompany.split(',');
                    opList.push("+");
                    opList.push("-");
                } else {
                    numList.push(result.updown);
                    opList.push("+");
                    opList.push("-");
                }
            }
            else if (result.downup) {
                if (result.downup.includes(',')) {
                    numList = result.downcompany.split(',');
                    opList.push("-");
                    opList.push("+");
                } else {
                    numList.push(result.downup);
                    opList.push("-");
                    opList.push("+");
                }
            }
            else {

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

        })
        .catch((err) => {
            console.log(err);
        })
}

function findDB(DBNum, DBop) {
    Company.findOne({ attributes: ['stockprice'], raw: true, where: { num: DBNum } })
        .then((result) => {
            afterPrice = eval(result.stockprice + DBop + random.startNum());
        })
        .then(() => {
            //Company.update({ stockprice: afterPrice }, { where: { num: DBNum } });
        })
        .catch((err) => {
            console.log(err);
        })
}

function randStock(sitNum) { // 상황 때문에 주가 변동되는 회사빼고 나머지는 랜덤 주가 변동 기능 함수
    var afterPrice = [];
    Company.findAll({ attributes: ['stockprice'], raw: true, where: { num: { [Op.notIn]: sitNum } } })
        .then((result) => {
            for (let i in result) {
                afterPrice.push(eval(result[i].stockprice + random.startOp() + random.startNum()));
            }
            console.log("sitNum : ", sitNum, afterPrice);
        })
        .then(() => {
            for (let i = 0; i < afterPrice.length; i++) {
                //Company.update({ stockprice: afterPrice[i] }, { where: { num: i + 1 } });
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

situationDB(1);
module.exports.startSituation = function () {
    situationDB(1);
}