import React, { useState } from "react";
import "./Mainpage.css";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fadeIn = () => {
    // eslint-disable-next-line no-undef
    setIsModalOpen(true);
  };

  const fadeOut = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="body_div">
      <div id="body_img"></div>
      <section class="Mainpage">
        <form action="http://localhost:4000/auth/login" method="POST">
          <div class="int-area">
            <input
              type="text"
              name="id"
              id="id"
              autocomplete="off"
              placeholder="ID"
            />
            <label for="id"></label>
          </div>
          <div class="int-area">
            <input
              type="password"
              name="pw"
              id="pw"
              autocomplete="off"
              placeholder="PW"
            />
            <label for="pw"></label>
          </div>

          <div class="button-area">
            <button id="btn" type="submit">
              로그인
            </button>
            <button id="btnn" type="button" onClick={JoinBtn}>
              회원가입
            </button>
          </div>
        </form>

        <div class="button-area-circle">
          <button class="bt_circle" id="bt_ka" onClick={KaKaoBtn}></button>
          <button class="bt_circle" id="bt_gi" onClick={GoogleBtn}></button>
          <form action="/auth/github" method="POST">
            <button class="bt_circle" id="bt_go"></button>
          </form>
        </div>

        <div class="ver">
          <h3>VER.0.5.0 20's</h3>
        </div>

        <div class="fiction">
          <h3>게임 속 기업들은 모두 픽션임을 공지합니다.</h3>
        </div>

        <div class="caption">
          <a href="#none" onClick={fadeIn}>
            비밀번호 찾기
          </a>
          <div
            id="modal-notice"
            class="modal"
            style={isModalOpen ? {} : { display: "none" }}
          >
            <div class="modal-content">
              <a class="close" href="#none" onClick={fadeOut}>
                X
              </a>
              <img src="/client/react/public/logomin.png" />
              <p>비밀번호를 찾고자하는 아이디를 입력해주세요.</p>
              <input
                class="ID_input"
                type="text"
                name="id"
                id="id"
                autocomplete="off"
                required
                placeholder="ID"
              />
              <a class="next" href="#none">
                다음
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function JoinBtn() {
  window.location.href = "http://localhost:3000/join";
}

function KaKaoBtn() {
  window.location.href = "http://localhost:4000/auth/kakao";
}

function GoogleBtn() {
  window.location.href = "http://localhost:4000/auth/google";
}

export default Main;
