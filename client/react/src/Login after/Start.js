import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StartPopup from "./StartPopup";
import Graph from "./randomGraph";
import axios from "axios";
import "./Start.css";

const Start = (props) => {
  const [viewPopup, setViewPopup] = useState(false);
  const [userData, setUserData] = useState({});
  const [rankData, setRankData] = useState({});
  const [formData, setFormData] = useState({
    id: "",
    nickname: "",
    email: "",
  });

  const getUserData = async () => {
    const userDBData = await axios.get("/api/mypage");
    console.log(userDBData);
    // sessionData에서 money 값을 가져와서 천 단위 구분 기호를 포함한 형태로 변경합니다.
    const formattedMoney = userDBData.data.userData.money.toLocaleString();

    setUserData({ ...userDBData.data.userData, money: formattedMoney });

    setFormData({
      nickname: userDBData.data.userData.nickname,
      money: userDBData.data.userData.money,
    });
  };

  // 순위 가져오기
  const getRank = async () => {
    const rankDB = await axios.get("/api/mypage/rank");
    setRankData(rankDB.data);
  };

  useEffect(() => {
    getUserData();
    getRank();
  }, []);

  const rank = rankData?.rank;

  const btnStyle = {
    position: "absolute",
    right: "110px",
    bottom: "65px",
    width: "180px",
    height: "55px",
    backgroundColor: "black",
    border: "1px solid white",
    color: "white",
    fontSize: "20pt",
  };

  const btnlogout = {
    position: "relative",
    left: "80px",
    top: "13px",
    width: "120px",
    height: "40px",
    backgroundColor: "white",
    border: "1px solid black",
    color: "black",
    fontSize: "17pt",
  };
  return (
    <div>
      <div>
        <Graph />
      </div>
      <Link to="/mypage">
        <div className="circle">
          <img className="profileImg" src={"profile_" + (userData.img + 2) + ".png"}></img>
        </div>
      </Link>
      <div className="balloon">
        <p className="P1">내 정보</p>
        <div className="P_div">
          <p className="P2">닉네임 </p>
          <p className="P2"> {userData.nickname} </p>
          <p className="P2"> 총 자산 </p>
          <p className="P2"> {userData.money}</p>
          <p className="P2"> 랭킹 순위 </p>
          <p className="P2"> {rank}</p>
        </div>
        <button style={btnlogout} onClick={LogoutBtn}>
          로그아웃
        </button>
      </div>
      <button style={btnStyle} onClick={() => setViewPopup(true)}>
        게임 시작
      </button>
      {/* <Button btnText={'게임 시작'} btnStyle={btnStyle}/> */}
      {viewPopup ? <StartPopup /> : ""}
    </div>
  );
};

function LogoutBtn() {
  window.location.href = "http://localhost:4000/auth/logout";
}

export default Start;
