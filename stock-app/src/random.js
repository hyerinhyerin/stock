var randomNum = () => {
  // 랜덤 숫자 내보내기(100~3000 사이 가격)
  var randNum = Math.floor(Math.random() * (300 - 10) + 1);
  randNum = parseInt(randNum + "0");

  return randNum;
};

var randomOperation = () => {
  // 주가 변동(오르락 내리락 랜덤)
  const operation = ["+", "-"];

  return operation[Math.floor(Math.random() * operation.length)];
};

module.exports.startNum = randomNum;
module.exports.startOp = randomOperation;
