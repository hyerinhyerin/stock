// 주가 변동되는 랜덤 숫자 뽑기
// 0-5만 -> 100~5000원 랜덤값
// 5-10만 -> 1-2만원 랜덤값
// 10만 이상 -> 2-3만원 랜덤값
var randomNum = (pre_price) => {
    var randNum = 0;

    if (0 <= pre_price && pre_price < 50000) {
        randNum = Math.floor(Math.random() * (5000 - 100) + 100);
    } else if (50000 <= pre_price && pre_price < 100000) {
        randNum = Math.floor(Math.random() * (20000 - 10000) + 10000);
    } else if (100000 <= pre_price) {
        randNum = Math.floor(Math.random() * (30000 - 20000) + 20000);
    }
    return randNum;
}

// 주가 변동(오르락 내리락 랜덤)
var randomOperation = () => {
    const operation = ["+", "-"];

    return operation[Math.floor(Math.random() * operation.length)];
}

// 상황 때문에 0원이 되면 금액이 많이 오르지 않게 함.
var retryNum = (pre_price) => {
    var randNum = 0;
    randNum = Math.floor(Math.random() * (100 - 1) + 1);
    return randNum;
}

module.exports.startNum = randomNum;
module.exports.startOp = randomOperation;
module.exports.retryNum = retryNum;

