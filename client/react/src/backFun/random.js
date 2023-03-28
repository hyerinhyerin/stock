var randomNum = () => {
  // 1000에서 2000 사이의 랜덤한 수 생성
  var randNum = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  randNum = parseInt(randNum);

  return randNum;
};

var randomOperation = () => {
  // 주가 변동(오르락 내리락 랜덤)
  const operation = ["+", "-"];

  return operation[Math.floor(Math.random() * operation.length)];
};

module.exports.startNum = randomNum;
module.exports.startOp = randomOperation;
