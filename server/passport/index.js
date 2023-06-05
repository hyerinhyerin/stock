const local = require("./localStragegy");
const kakao = require("./kakaoStragegy");
const google = require("./googleStragegy");
const github = require("./githubStragegy");
const { User } = require("../models");
const passport = require("passport");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("시리얼라이즈 유저 : ", user); // user는 tokenUser
    // 로그인 시, 사용자 데이터를 세션에 저장하는데
    done(null, {
      id: user.user.id,
      nickname: user.nickname,
      accessToken: user.accessToken,
    });
  });
  passport.deserializeUser((user, done) => {
    // deserializeUser의 매개변수 user는 serializeUser가 보내는 데이터
    // user = { id: user.user.id, accessToken: user.accessToken }
    console.log("디시리얼라이즈 유저", user);
    User.findOne({ where: { id: user.id } })
      .then((result) => {
        // db에서 가져온 유저데이터 result
        const tokenUser = {
          user: result,
          nickname: user.nickname,
          accessToken: user.accessToken,
        };
        done(null, tokenUser);
      }) // 조회한 정보를 req.user에 저장
      .catch((err) => {
        done(err);
      });
  });
  local();
  kakao();
  google();
  github();
};
