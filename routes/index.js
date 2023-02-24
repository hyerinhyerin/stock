const express = require("express");
const path = require("path");
const userController = require("../contoroller/userController");
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    // isAuthenticated는 passport에서 제공하는 인증 되있는지 true flase로 알려주는 메서드
    // 로그인시 응답부분인데 주소를 날려주되 client-side-rendering을 사용해서 서버측(백)은
    // 만약에 주식정보 /stock/info로 요청이 왔다 ajax임 그럼 정보를 반응해서 날려주고 클라이언트(프론트)
    // 는 정보를 사용해서 페이지 제작
    return res.sendFile(path.join(__dirname, "../react/main.html"));
  } else {
    return res.sendFile(path.join(__dirname, "../react/main.html"));
  }
});

router
  .route("/mypage")
  .get(userController.getMypage)
  .post(userController.postMypage);

module.exports = router;
