import axios from "axios";
import React, { useEffect, useState } from "react";

const NewPanel = () => {
  const divStyle = {
    textAlign: "center",
    border: "1px solid white",
    width: "1123px",
    height: "100px",
    lineHeight: "100px",
    position: "relative",
    marginLeft: "35px",
  };
  const newsFlashStyle = {
    color: "white",
    marginLeft: "25px",
    fontSize: "50px",
    display: "inline-block",
    verticalAlign: "middle",
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const newsContent = {
    color: "white",
    fontSize: "22px",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    alignItems: "center",
    marginLeft: "96px",
  };

  const [situation, setSituation] = useState({}); // 상황 데이터
  const [randomSituation, setRandomSituation] = useState("로딩중입니다...");
  const earlyRandomIdx = Math.floor(Math.random() * 49); // 0 ~ 48 random Index
  const randomSecond = Math.floor(Math.random() * (40001 - 20000) + 20000); // 20000 ~ 400000

  const getSituation = async () => {
    const situationData = await axios.get("http://localhost:4000/api/situation");
    console.log(situationData.data.situation);
    setSituation(situationData.data.situation);
    setRandomSituation(situationData.data.situation[earlyRandomIdx].situation);
  };

  const randomSituationFun = () => {
    const randomIdx = Math.floor(Math.random() * 49); // 0 ~ 48 random Index
    setRandomSituation(situation[randomIdx].situation);
  };

  useEffect(() => {
    getSituation();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(randomSituationFun, randomSecond);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={divStyle}>
      <span style={newsFlashStyle}>속보 </span>
      {randomSituation ? (
        <span style={newsContent}>{randomSituation}</span>
      ) : (
        <span style={newsContent}>로딩중입니다...</span>
      )}
    </div>
  );
};

export default NewPanel;
