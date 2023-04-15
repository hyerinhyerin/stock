import React from "react";
import Mypage from "./Mypage/Mypage";
import Chart from "./GamePage/stockChart";
import GamePage from "./GamePage/gamePage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/gamePage" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
