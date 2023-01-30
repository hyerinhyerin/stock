const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const path = require("path");
const axios = require("axios");
const { User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const userController = require("../contoroller/userController");

const router = express.Router();

router.get("/", isNotLoggedIn, (req, res, next) => {
  // 만든 프론트 페이지 렌더 해줘야함
  return res.sendFile(path.join(__dirname, "../react/main.html"));
});

// 회원가입 라우터
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { nickname, id, pw, email } = req.body; // email = req.body.email
  try {
    const exUser = await User.findOne({ where: { id } });
    if (exUser) {
      return res.status(200).json({ already: true });
      return res.redirect("/auth");
    } else {
      const hash = await bcrypt.hash(pw, 12);
      await User.create({
        nickname,
        id,
        pw: hash,
        email,
      });
      return res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 로그인 라우터
router
  .route("/login")
  .get(userController.getLogin)
  .post(isNotLoggedIn, userController.postLogin);
// req.login()메서드가 호출되어 성공을 하게되면, passport/index.js 안의 serializeUser라는 것이 실행

router.get("/kakao", passport.authenticate("kakao"));
router.get(
  "/kakao/callback",
  //? 그리고 passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
  passport.authenticate("kakao", {
    failureRedirect: "/", // kakaoStrategy에서 실패한다면 실행
  }),
  // kakaoStrategy에서 성공한다면 콜백 실행
  (req, res) => {
    // return res.status(200).json({ kakaoLogin: true });
    res.redirect("/");
  }
);

// 로그아웃 라우터
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/"); // 로그아웃시 보낼 주소
});

// 카카오 로그아웃
// auth//kakao/logout
router.get("/kakao/logout", async (req, res, next) => {
  try {
    const ACCESS_TOKEN = req.user.accessToken;

    let logout = await axios({
      method: "post",
      url: "https://kapi.kakao.com/v1/user/unlink",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
  // 세션 정리
  req.logout();
  req.session.destroy();

  res.redirect("/");
});

module.exports = router;
