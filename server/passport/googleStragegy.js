const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { User } = require("../models");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID, // 구글 로그인에서 발급받은 REST API 키
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/auth/google/callback", // 구글 로그인 Redirect URI 경로
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
            where: { snsId: profile.id, provider: "google" },
          });
          // 이미 가입된 구글 프로필이면 성공
          if (exUser) {
            const tokenUser = {
              user: exUser,
              nickname: exUser.nickname,
              accessToken: "",
            };
            done(null, tokenUser); // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await User.create({
              nickname: profile.displayName,
              id: profile.emails[0].value,
              pw: null,
              email: profile.emails[0].value,
              money: 1000000,
              snsId: profile.id,
              provider: "google",
              img: 0,
            });
            const tokenUser = {
              user: newUser,
              nickname: newUser.nickname,
              accessToken: "",
            };
            done(null, tokenUser); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
