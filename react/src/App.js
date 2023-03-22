import React, { useEffect } from "react";
import Mypage from "./Mypage/Mypage";
import LogoCP from "./Component/LogoCP";
import Start from "./Login after/Start";
import Join from "./Join/Join";
import "./App.css";
import axios from "axios";

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
    <div>
      <Mypage />
    </div>
  );
};

export default App;
