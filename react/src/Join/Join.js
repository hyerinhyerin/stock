import React, { useEffect, useState } from "react";
import JoinComponent from "../Component/JoinComponent";
import Button from "../Component/Button";
import "./Join.css";

const Join = () => {
  const btnStyle = {
    position: "absolute",
    width: "120px",
    height: "55px",
    // marginTop:'40px',
    // marginLeft:'30px',
    right: "62px",
    bottom: "60px",
    border: "1px solid white",
    backgroundColor: "black",
    fontSize: "15pt",
    color: "white",
  };
  return (
    <div className="Join">
      <form action="/auth/join" method="POST">
        <JoinComponent JoinP="nickname" ipType="text" />
        <input type="checkbox" />
        <p className="nickP">닉네임 중복 확인</p>
        <JoinComponent JoinP="id" ipType="text" />
        <input type="checkbox" />
        <p className="checkP">아이디 중복 확인</p>
        <JoinComponent JoinP="pw" ipType="text" />
        <JoinComponent JoinP="비밀번호 확인" ipType="text" />
        <JoinComponent JoinP="email" ipType="email" />
        <button style={btnStyle}>확인</button>
        {/* <Button btnStyle={btnStyle} btnText={'확인'}/> */}
      </form>
    </div>
  );
};

export default Join;
