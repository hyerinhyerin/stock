import React, { useState, useEffect } from "react";
import Button from "../Component/Button";
import StartPopup from "./StartPopup";
import Graph from "./randomGraph";
import "./Start.css";
import axios from "axios";
const Start = (props) => {
  const [viewPopup, setViewPopup] = useState(false);

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

  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const userDBData = await axios.get("/api/mypage");
    console.log("확인 : ", userDBData.data.userData);
    setUserData(userDBData.data.userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const nickname = userData?.nickname;
  const money = userData?.money;

  return (
    <div>
      <div>
        <Graph />
      </div>
      <div className="circle">
        <img className="profileImg" src={"profile_2.png"}></img>
      </div>
      <div className="balloon">
        <p className="P1">내 정보</p>
        <div id="ballon_div">
          <span className="P2">닉네임</span>
          <span className="P2">{nickname}</span>
          <span className="P2"> 총 자산 </span>
          <span className="P2">{money}</span>
          <span className="P2"> 랭킹 순위 </span>
          <span> </span>
        </div>
        <Button btnText={"로그아웃"} type="button" btnStyle={btnlogout} onClick={LogoutBtn} />
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
  console.log("클릭");
  window.location.href = "http://localhost:4000/auth/logout"
}


export default Start;
