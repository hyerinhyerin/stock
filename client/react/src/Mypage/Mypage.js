import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/JoinComponent.css";
import ProfileImage from "./ProfileImage";
import Drop from "./Drop";
// import {Mobile, PC} from '../components/Responsive';
// import StartPopup from "../Login after/StartPopup";
import axios from "axios";

const Mypage = () => {
  //탈퇴창 view 여부
  const [viewDrop, setViewDrop] = useState(false);
  ///////수정 버튼 클릭에 따라 input 입력 제한
  const [editType, setEditType] = useState(true);
  ////// 백엔드로 수정된 결과 post하기 
  const [formData, setFormData] = useState({
    id: '',
    nickname: '',
    email: ''
  });
  ///// backend에서 유저 정보 받아오기
  const [userData, setUserData] = useState({});


  ////back에서 정보 받기
  const getUserData = async () => {
    const userDBData = await axios.get("/api/mypage");
    console.log("확인 : ", userDBData.data.userData);
    setUserData(userDBData.data.userData);
    setFormData({
      id: userDBData.data.userData.id,
      nickname: userDBData.data.userData.nickname,
      email: userDBData.data.userData.email
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  // const nickname = userData?.nickname;
  // const id = userData?.id;
  // const email = userData?.email;

  ///backend로 정보 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/mypage", formData);
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  ////input창 수정되었을 경우 formdata 수정
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  //탈퇴창에서 잘못누름을 택했을 때 view를 받아 탈퇴창 사라짐을 해당 컴포넌트에도 알려줌.
  const getData = (v) => {
    setViewDrop(v);
  };

  //////style
  const divStyle = {
    textAlign: "center",
    // marginTop: '50px', 인풋창막는 경우
    marginTop: "100px", //아이디 올리는 경우
  };
  const editStyle = {
    position: "absolute",
    right: "230px",
    marginTop: "100px",
    // bottom:'60px',
  };
  const outStyle = {
    position: "absolute",
    right: "60px",
    marginTop: "100px",
    // bottom:'60px',
  };

  const btnStyle = {
    width: "120px",
    height: "55px",
    border: "1px solid white",
    backgroundColor: "black",
    fontSize: "15pt",
    color: "white",
  };
  const backStyle = {
    position: "absolute",
    width: "50px",
    height: "50px",
    left: "20px",
  }

  return (
    <div>
      {/* <PC> */}
      <Link to="/gameMain">
        <img style={backStyle} src="back.png"></img>
      </Link>
      <ProfileImage
        id={formData.id}
      />
      <form onSubmit={handleSubmit}>
        <div style={divStyle}>
          <div>
            <p className="joinp">닉네임</p>
            <input value={formData.nickname} name="nickname" type="text" onChange={handleChange} required readOnly={editType}></input>
          </div>
          <div>
            <p className="joinp">이메일</p>
            <input value={formData.email} name="email" type="email" onChange={handleChange} required readOnly={editType}></input>
          </div>
        </div>
        <div style={editStyle}>
          {editType ?
            <button
              style={btnStyle}
              onClick={() => {
                setEditType(!editType);
              }}
            >
              수정
            </button> :
            <Link to="/mypage">
              <button
                type="submit"
                style={btnStyle}
                onClick={() => {
                  setEditType(!editType);
                }}
              >
                확인
              </button>
            </Link>
          }
        </div>
      </form>
      <div style={outStyle}>
        <button type="submit" style={btnStyle} onClick={() => setViewDrop(!viewDrop)}>
          탈퇴
        </button>
      </div>
      {viewDrop ? <Drop formData={formData} view={viewDrop} getData={getData} /> : ""}
      {/* </PC>     */}
    </div>
  );
};

export default Mypage;