const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const { User } = require("../models");

module.exports = () => {
  // strategy를 미들웨어로
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: process.env.GITHUB_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log("github profile : ", profile);
        try {
          const exUser = await User.findOne({
            snsId: profile.id,
            provider: "github",
          });
          // 이미 가입된 깃허브 프로필이면 성공
          if (exUser) {
            const tokenUser = {
              user: exUser,
              nickname: exUser.nickname,
              accessToken: "",
            };
            return cb(null, tokenUser); // 로그인 인증 완료
          } else {
            // 가입되지 않은 유저면 회원가입 시키고 로그인 시키기
            const newUser = await User.create({
              nickname: profile.username,
              id: profile._json.login,
              pw: null,
              email: profile._json.login,
              money: 1000000,
              snsId: profile.id,
              provider: "github",
            });
            const tokenUser = {
              user: newUser,
              nickname: newUser.nickname,
              accessToken: "",
            };
            return cb(null, tokenUser); // 회원가입 로그인 인증 완료
          }
        } catch (err) {
          console.error(err);
          return cb(err);
        }
      }
    )
  );
};
