import React from "react";
import Mypage from "./Mypage/Mypage";
import GamePage from "./GamePage/gamePage";
import GraphCpt from "./GamePage/graphCpt";
import Join from "./Join/Join";
import GameMain from "./Login after/Start";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <form action="http://localhost:4000/auth/login" method="POST">
        <input
          type="text"
          name="id"
          style={{ backgroundColor: "white", color: "black" }}
        />
        <input
          type="text"
          name="pw"
          style={{ backgroundColor: "white", color: "black" }}
        />
        <button>로그인</button>
      </form>
      <a href="/auth/logout">
        <button>로그아웃</button>
      </a>
      <a href="/join">
        <button>회원가입</button>
      </a>
      <a href="/auth/kakao">
        <button>카카오로그인</button>
      </a>
      <a href="/auth/google">
        <button>구글로그인</button>
      </a>
      <form action="/auth/github" method="POST">
        <button>깃허브로그인</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/gameMain" element={<GameMain />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/graphCpt" element={<GraphCpt />} />
        <Route path="/gamePage" element={<GamePage />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
};

export default App;
