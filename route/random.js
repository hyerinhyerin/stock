// 랜덤 숫자 내보내기(10~500 사이 숫자)
module.exports.randomNum = function(){
    var randomNum = Math.floor(Math.random() * (500 - 10) + 1);
    return parseInt(randomNum+"0");
};

module.exports.randomOperation = function(){
    const operation = ["+", "-"];
    var randomOperation = operation[Math.floor(Math.random()*operation.length)];
    return randomOperation;
};