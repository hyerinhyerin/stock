import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinComponent from "./JoinComponent";
import "./Join.css";

const Join = () => {
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const [redirectTo, setRedirectTo] = useState(null);

  //joincomponent에서 id, nickname 값 받아오기
  const getData = (name, data) => {
    if (name === "nickname") {
      setNickname(data);
      console.log("nickname : ", nickname);
    } else if (name === "id") {
      setId(data);
      console.log("id : ", id);
    }
  };

  const handleNickButtonClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/checknickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname: nickname }),
      });
      const data = await response.json();
      if (!data.message) {
        setMessage("닉네임을 입력해주세요.");
      } else if (data.message === "exists") {
        setMessage("이미 존재하는 닉네임입니다.");
      } else {
        setMessage("사용 가능한 닉네임임입니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIdButtonClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/checkid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      if (!data.message) {
        setMessage("아이디을 입력해주세요.");
      } else if (data.message === "exists") {
        setMessage("이미 존재하는 아이디입니다.");
      } else {
        setMessage("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log("data : ", data);

    fetch("/auth/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        // 응답 처리
        if (responseData.redirectTo) {
          setRedirectTo(responseData.redirectTo);
        } else {
          e.preventDefault();
          setMessage(responseData.message);
        }
      })
      .catch((error) => {
        // 에러 처리
        console.error(error);
      });
  };

  if (redirectTo) {
    return <> {navigate(redirectTo)} </>;
  }

  const btnStyle = {
    position: "absolute",
    width: "120px",
    height: "55px",
    marginTop: "62px",
    right: "62px",
    border: "1px solid white",
    backgroundColor: "black",
    fontSize: "15pt",
    color: "white",
  };
  return (
    <div className="Join">
      <div className="message" style={{ color: "white" }}>
        {message}
      </div>
      <form onSubmit={handleSignUp}>
        <JoinComponent
          name="nickname"
          JoinP="닉네임"
          ipType="text"
          getData={getData}
        />
        <button
          className="btnstyle"
          type="button"
          onClick={handleNickButtonClick}
        >
          중복 확인
        </button>
        <JoinComponent
          name="id"
          JoinP="아이디"
          ipType="text"
          getData={getData}
        />
        <button
          className="btnstyle"
          type="button"
          onClick={handleIdButtonClick}
        >
          중복 확인
        </button>
        <JoinComponent
          name="pw"
          JoinP="비밀번호"
          ipType="password"
          getData={getData}
        />
        <JoinComponent
          name="pwcheck"
          JoinP="비밀번호 확인"
          ipType="password"
          getData={getData}
        />
        <JoinComponent
          name="email"
          JoinP="이메일"
          ipType="email"
          getData={getData}
        />
        <button type="submit" style={btnStyle}>
          확인
        </button>
      </form>
    </div>
  );
};

export default Join;
