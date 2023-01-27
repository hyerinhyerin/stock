const Company = require('../models/Company');

// 랜덤으로 모든 회사 주가가 변동되는 함수 반복 실행.
function randomPrice() {
    var randomNum = 0;
    var randomOperation = "";

    // 랜덤 숫자 내보내기(100~5000 사이 가격)
    randomNum = Math.floor(Math.random() * (500 - 10) + 1);
    randomNum = parseInt(randomNum + "0");

    // 주가 변동(오르락 내리락 랜덤)
    const operation = ["+", "-"];
    randomOperation = operation[Math.floor(Math.random() * operation.length)];

    var afterPrice = [];

    Company.findAll({ attributes: ['stockprice'], raw: true })
        .then((result) => {
            for (let i in result) {
                afterPrice.push(eval(result[i].stockprice + randomOperation + randomNum));
            }
            console.log(afterPrice);
        })
        .then(() => {
            for (let i = 0; i < afterPrice.length; i++) {
                //Company.update({ stockprice: afterPrice[i] }, { where: { num: i + 1 } });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

var Ran;

function start() {
    console.log("시작");
    Ran = setInterval(randomPrice, 1000);
}

function stop() {
    console.log("멈춰");
    clearInterval(Ran);
}


module.exports.startRandom = function () {
    start();
}

module.exports.stopRandom = function () {
    stop();
}