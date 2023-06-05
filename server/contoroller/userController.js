const passport = require("passport");
const path = require("path");
const { User } = require("../models");
const { Company } = require("../models");
const { Situation } = require("../models");
const { GameTable } = require("../models");
const { Op } = require("sequelize");

module.exports.getLogin = (req, res) => {
  return res.redirect("/");
};

module.exports.postLogin = async (req, res, next) => {
  // 첫 번째 인자로 'local'이 들어갔습니다. 이 local 부분을 만나면 위에서 만들었던 ../passport/localStrategy.js가 실행됩니다.
  passport.authenticate("local", (authError, user, info) => {
    // localStrategy.js에서 done으로 나온 결과가 passport.authenticate의 두 번째 인자로 들어가게 되는 것입니다.
    if (authError) {
      // 로그인 에러가 발생했을 경우 authError에서 걸리는 것
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      // user가 없을 경우 !user에서 걸리도록
      //req.flash('loginError',info.message);
      console.log("login Error");
      return res.redirect("/");
    }
    // 그 외에는 req.login(user) 코드를 작성하여 로그인을 성공
    // req.login()메서드는 passport가 추가해준 메서드로, 사용자의 정보를 세션에 저장해주는 메서드
    // 이 사용자 정보는 이후 req.user로 접근하여 찾을 수 있습니다.
    return req.login(user, (loginError) => {
      // 뒤의 로그인 에러는 done()까지 완료되었음에도, 세션에 저장실패 에러가 발생하거나 등등의 에러가 발생하였을 때를 대비하여 넣어둔 코드입니다.
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      return res.redirect("http://localhost:3000/gameMain"); // 로그인 성공시 날릴 라우터 부분
    });
  })(req, res, next);
};

module.exports.getMypage = (req, res) => {
  return res.sendFile(path.join(__dirname, "../react/mypage.html"));
};

module.exports.postMypage = async (req, res) => {
  const nickname = req.session.passport.user.nickname;
  const exUser = await User.findOne({
    where: nickname,
  });
  if (exUser) {
    return exUser;
  }
};

module.exports.chart = async (req, res) => {
  const companys = await Company.findAll({
    where: {
      stockprice: {
        [Op.gte]: 0,
      },
    },
    raw: true,
  });

  if (companys) {
    return res.send({ companys: companys });
  } else {
    console.log("회사가 찾아지지 않습니다.");
  }
};

module.exports.situation = async (req, res) => {
  const situation = await Situation.findAll();

  if (situation) {
    return res.send({ situation: situation });
  } else {
    console.log("상황이 찾아지지 않습니다.");
  }
};

let companiesObjArr = null;

module.exports.getCurrentPrice = async (req, res) => {
  companiesObjArr = req.body;

  for (let i = 0; i < companiesObjArr.length; i++) {
    const row = await Company.findOne({
      where: {
        companyname: companiesObjArr[i][29].name,
      },
    });

    if (!row) {
      res.status(404).send("Not found");
    } else {
      row.stockprice = companiesObjArr[i][29].stck_oprc;
      row.save();
    }
  }
  return res.status(200).send("Data received successfully");
};

// 세션 정보 날리는거
module.exports.postSession = async (req, res) => {
  const nickname = req.session.passport.user.nickname;
  const exUser = await GameTable.findOne({
    where: {
      usernickname: nickname,
    },
  });
  if (exUser) {
    return res.send({ sessionUser: exUser });
  }
};
