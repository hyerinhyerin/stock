const express = require("express");
const userController = require("../contoroller/userController");
const router = express.Router();

router.route("/chart").get(userController.chart).post(userController.chart);

router.route("/curentdata").post(userController.getCurrentPrice); // 2. 받은거

router
  .route("/session")
  .get(userController.postSession)
  .post(userController.postSession);

// 상황 테스터
router.route("/situationTest").post(userController.postSituation);

module.exports = router;
