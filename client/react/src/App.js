import React, { useEffect } from "react";
import Mypage from "./Mypage/Mypage";
import Chart from "./GamePage/stockChart";
import LogoCP from "./Component/LogoCP";
import Start from "./Login after/Start";
import Join from "./Join/Join";
import GamePage from "./GamePage/gamePage";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// function App() {
//   const callApi = async () => {
//     axios.get("/api").then((res) => {
//       console.log(res.data.test);
//     }); // 서버의 test 데이터를 불러옴
//   };

//   useEffect(() => {
//     callApi();
//   }, []);
//   return <div>test</div>;
// }

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chart" element={<Chart />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/gamePage" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
