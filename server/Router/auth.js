const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const path = require("path");
const axios = require("axios");
const { User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const userController = require("../contoroller/userController");

const router = express.Router();

// 아이디 중복검사 라우터
router.post("/checkid", async (req, res) => {
  const id = req.id;
  try {
    const idUser = await User.findOne({ where: { id } });
    if (idUser) {
      alert("이미 존재하는 아이디입니다.");
    } else {
      alert("사용 가능한 아이디입니다.");
    }
  } catch (err) {
    console.log(err);
  }
});

// 닉네임 중복검사 라우터
router.post("/checknickname", async (req, res) => {
  const nickname = req.nickname;
  try {
    const idUser = await User.findOne({ where: { nickname } });
    if (idUser) {
      alert("이미 존재하는 닉네임입니다.");
    } else {
      alert("사용 가능한 닉네임입니다.");
    }
  } catch (err) {
    console.log(err);
  }
});

// 회원가입 라우터
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { nickname, id, pw, email } = req.body; // email = req.body.email
  try {
    const exUser = await User.findOne({ where: { id } });
    if (exUser) {
      alert("이미 존재하는 유저 아이디 입니다.");
      return res.redirect("/auth"); // 회원가입페이지로 리로드
    } else {
      const hash = await bcrypt.hash(pw, 12);
      const random = Math.floor(Math.random() * 100000000);
      await User.create({
        nickname,
        id,
        pw: hash,
        email,
        money: 1000000,
        snsId: random,
        provider: "local",
        img: 0
      });
      return res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/", isNotLoggedIn, (req, res, next) => {
  // 만든 프론트 페이지 렌더 해줘야함
  return res.sendFile(path.join(__dirname, "../react/main.html"));
});

// 깃허브 로그인
// /auth/github
router.post("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => res.redirect("/")
);

// local 로그인 라우터
router
  .route("/login")
  .get(userController.getLogin)
  .post(isNotLoggedIn, userController.postLogin);
// req.login()메서드가 호출되어 성공을 하게되면, passport/index.js 안의 serializeUser라는 것이 실행

// 카카오 로그인 라우터
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

// 구글 로그인
// /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
); // 프로파일과 이메일 정보를 받는다.

//? 위에서 구글 서버 로그인이 되면, 네이버 redirect url 설정에 따라 이쪽 라우터로 오게 된다. 인증 코드를 박게됨
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }), //? 그리고 passport 로그인 전략에 의해 googleStrategy로 가서 구글계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
  (req, res) => {
    res.redirect("/");
  }
);

// 로그아웃 라우터
router.get("/logout", isLoggedIn, async (req, res) => {
  try {
    const ACCESS_TOKEN = req.user.accessToken;
    if (ACCESS_TOKEN) {
      console.log("nickname위치", req.session.passport.user.nickname);

      let logout = await axios({
        method: "post",
        url: "https://kapi.kakao.com/v1/user/unlink",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.json(error);
  }
  // 세션 정리
  req.logout();
  req.session.destroy();

  res.redirect("http://localhost:3000"); // 로그아웃시 보낼 주소
});

module.exports = router;
