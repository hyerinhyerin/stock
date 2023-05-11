const express = require("express");
const session = require("express-session");
const { sequelize } = require('./models');
const cp = require('cookie-parser');
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require("path");
const morgan = require("morgan"); // 작업 수행시 로깅
const passport = require("passport"); // passport 미들웨어 가져오기
const cookieParser = require("cookie-parser"); // 쿠키 파싱 미들웨어

const dotenv = require("dotenv"); // .env SECRET 정보 가져오기
dotenv.config();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const { sequelize } = require("./models");
// passportConfig - passport 내부 js 실행 (use, serialize, deserialze)
const passportConfig = require("./passport");
passportConfig(passport);

const app = express();

app.use(express.static(__dirname + "/"));

app.use(bodyParser.urlencoded({ extended: false }));

// 세션(미들웨어)
app.use(express.json());
const cors = require("cors");
app.use(cors());
// 이 코드 넣고 시작하셔야 리액트와 nodejs 서버간 ajax 요청 잘됩니다.

// async () => {
//   await sequelize.sync();
//   console.log("데이터베이스 연결 성공");
// };

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// cookieParser 설정에 비밀키를 넣어주자.
// cookieParser를 사용하게되면 req.cookies로 접근이 가능하다.
app.use(cookieParser(process.env.COOKIE_SECRET));

// session 설정
app.use(
  session({
    secret: "loginData",
    resave: false,
    saveUninitialized: true,
    // store : new FileStore(),
  })
);

app.use(cp());
//app.use(cors());

app.get('/', function (req, res) {
  res.send("완료");
});

// app.get('/api/main', async (req, res) => {
//   res.send({ message: "안녕" });
// });

const stockprice = require("./route/stockprice");
app.use('/stockprice', stockprice);

const startGame = require("./route/startGame");
app.use('/startGame', startGame);

const find = require("./route/findPW");
app.use('/find', find);

const select = require("./route/selectPW");
app.use('/select', select);

const sell = require("./route/sellStock");
app.use('/sell', sell);

const buy = require("./route/buyStock");
app.use('/buy', buy);

app.listen(3001, function () {
  console.log('연결되었습니다.');
});
app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
