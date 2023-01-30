const local = require("./localStragegy");
const kakao = require("./kakaoStragegy");
const { User } = require("../models");
const passport = require("passport");

// module.exports = (passport) => {
//   console.log("h1");
//   // 로그인 성공 시 세션에는 쿠키와 id만 들고있는다. 왜? 세션에는 무거워서 유저 정보 다 못담음
//   passport.serializeUser((user, done) => {
//     // null - 서버 에러
//     // user.id - 성공해서 user의 id를 가져온다.
//     done(null, user.id);
//   });

//   // 서버에서 유저에 대한 모든 정보를 갖고 있게되면, 서버 과부화가 생기게된다.
//   // 그래서 서버는 id만 갖고있다가, 페이지 이동 시 필요한 유저 정보는 DB에서 찾아서 가져온다.
//   // 그래서 세션이 id정보만 가지고 요청올때마다 유저정보 가지고 오는게 그게 deserializeUser 역할이다.
//   passport.deserializeUser(async (id, done) => {
//     // DB에서 정보를 찾으면 req.user로 넣어준다.
//     try {
//       const user = await User.findOne({ where: { id } });
//       done(null, user); // done 시 callback
//     } catch (error) {
//       console.error(error);
//       done(error);
//     }
//   });

//   local(passport);
//   kakao(passport);
// };

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("시리얼라이즈 유저 : ", user); // user는 tokenUser
    // 로그인 시, 사용자 데이터를 세션에 저장하는데
    done(null, { id: user.user.id, accessToken: user.accessToken });
  });
  passport.deserializeUser((user, done) => {
    // deserializeUser의 매개변수 user는 serializeUser가 보내는 데이터
    // user = { id: user.user.id, accessToken: user.accessToken }
    console.log("디시리얼라이즈 유저", user);
    User.findOne({ where: { id: user.id } })
      .then((result) => {
        // db에서 가져온 유저데이터 result
        const tokenUser = { user: result, accessToken: user.accessToken };
        done(null, tokenUser);
      }) // 조회한 정보를 req.user에 저장
      .catch((err) => {
        done(err);
      });
  });
  local();
  kakao();
};
