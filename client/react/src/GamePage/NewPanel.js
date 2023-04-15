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
  const randomIdx = Math.floor(Math.random() * 49); // 0 ~ 48 random Index

  const getSituation = async () => {
    const situationData = await axios.get("/api/situation");
    setSituation(situationData.data.situation);
  };

  useEffect(() => {
    getSituation();
  }, []);

  return (
    <div style={divStyle}>
      <span style={newsFlashStyle}>속보 </span>
      <span style={newsContent}>{situation[randomIdx]?.situation}</span>
    </div>
  );
};

export default NewPanel;
