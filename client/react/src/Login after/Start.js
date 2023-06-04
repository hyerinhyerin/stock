import React, { useState, Component } from "react";
import Button from "../components/Button";
import StartPopup from "./StartPopup";
import Graph from "./randomGraph";
import "./Start.css";
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
        <p className="P2">
          닉네임 <pre> </pre>
        </p>
        <p className="P2">
          총 자산 <pre> </pre>
        </p>
        <p className="P2">
          랭킹 순위 <pre> </pre>
        </p>
        <Button btnText={"로그아웃"} btnStyle={btnlogout} />
      </div>
      <button style={btnStyle} onClick={() => setViewPopup(true)}>
        게임 시작
      </button>
      {/* <Button btnText={'게임 시작'} btnStyle={btnStyle}/> */}
      {viewPopup ? <StartPopup /> : ""}
    </div>
  );
};

export default Start;
