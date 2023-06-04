import React from "react";
import Mypage from "./Mypage/Mypage";
import GamePage from "./GamePage/gamePage";
import GraphCpt from "./GamePage/graphCpt";
import Join from "./Join/Join";
import GameMain from "./Login after/Start";
import Main from "./Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
