import React from "react";
import Mypage from "./Mypage/Mypage";
import Chart from "./GamePage/stockChart";
import GamePage from "./GamePage/gamePage";
import Start from "./Login after/Start";
import Join from "./Join/Join";
import GameMain from "./Login after/Start";
import Main from "./Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/start" element={<Start />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/gamePage" element={<GamePage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/gameMain" element={<GameMain />} />
      </Routes>
    </Router>
  );
};

export default App;
