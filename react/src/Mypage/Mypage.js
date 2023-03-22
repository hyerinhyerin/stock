import React, { useEffect, useState } from "react";
import JoinComponent from "../Component/JoinComponent";
import ProfileImage from "./ProfileImage";
import Drop from "./Drop";
import Button from "../Component/Button";
import StartPopup from "../Component/StartPopup";
import axios from "axios";

const Mypage = () => {
  const [viewDrop, setViewDrop] = useState(false);
  const divStyle = {
    textAlign: "center",
    // marginTop: '50px', 인풋창막는 경우
    marginTop: "100px", //아이디 올리는 경우
  };
  const editStyle = {
    position: "absolute",
    right: "230px",
    bottom: "60px",
  };
  const outStyle = {
    position: "absolute",
    right: "60px",
    bottom: "60px",
  };

  const btnStyle = {
    width: "120px",
    height: "55px",
    border: "1px solid white",
    backgroundColor: "black",
    fontSize: "15pt",
    color: "white",
  };
  //탈퇴창에서 잘못누름을 택했을 때 view를 받아 탈퇴창 사라짐을 해당 컴포넌트에도 알려줌.
  const getData = (v) => {
    setViewDrop(v);
  };

  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const res = await axios.get("/api/mypage");
    setUserData(res.data.test);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const nickname = userData?.nickname;
  const email = userData?.email;

  if (nickname) {
    console.log("nickname : ", nickname);
  }
  return (
    <div>
      <ProfileImage />
      <div style={divStyle}>
        <JoinComponent JoinP="닉네임" ipType="text" Udata={nickname} />
        {/* <JoinComponent JoinP="아이디" ipType="text"/> */}
        {/* <JoinComponent JoinP="비밀번호" ipType="password"/> */}
        <JoinComponent JoinP="이메일" ipType="email" Udata={email} />
      </div>
      <div style={editStyle}>
        <button style={btnStyle}>수정</button>
        {/* <Button btnStyle={btnStyle} btnText='수정'/> */}
      </div>
      <div style={outStyle}>
        <button style={btnStyle} onClick={() => setViewDrop(!viewDrop)}>
          탈퇴
        </button>
        {/* <Button btnStyle={btnStyle} btnText='탈퇴'/> */}
      </div>
      {viewDrop ? <Drop view={viewDrop} getData={getData} /> : ""}
    </div>
  );
};

export default Mypage;
