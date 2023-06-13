import React from "react";
import "./Mainpage.css";

const Main = () => {
  return (
    <div id="body_div">
      <div id="body_img"></div>
      <section className="Mainpage">
        <form action="http://localhost:4000/auth/login" method="POST">
          <div className="int-area">
            <input
              type="text"
              name="id"
              id="id"
              autoComplete="off"
              placeholder="ID"
            />
            <label for="id"></label>
          </div>
          <div className="int-area">
            <input
              type="password"
              name="pw"
              id="pw"
              autoComplete="off"
              placeholder="PW"
            />
            <label for="pw"></label>
          </div>

          <div className="button-area">
            <button id="btn" type="button" onClick={joinBtn}>
              회원가입
            </button>
            <button id="btnn" type="submit">
              로그인
            </button>
          </div>
        </form>

        <div className="button-area-circle">
          <button className="bt_circle" id="bt_ka" onClick={kakaoBtn}></button>
          <button className="bt_circle" id="bt_gi" onClick={googleBtn}></button>
          <form action="/auth/github" method="POST">
            <button className="bt_circle" id="bt_go"></button>
          </form>
        </div>

        <div className="ver">
          <h3>VER.0.5.0 20's</h3>
        </div>

        <div className="fiction">
          <h3>게임 속 기업들은 모두 픽션임을 공지합니다.</h3>
        </div>
      </section>
    </div>
  );
};

function joinBtn() {
  window.location.href = "http://localhost:3000/join";
}

function kakaoBtn() {
  window.location.href = "http://localhost:4000/auth/kakao";
}

function googleBtn() {
  window.location.href = "http://localhost:4000/auth/google";
}

export default Main;
