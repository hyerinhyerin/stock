import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Start1Btn = () => {
  axios.get("/api/startGame", { params: { startNum: 1 } });
};

function Start2Btn() {
  axios.get("/api/startGame", { params: { startNum: 2 } });
};

const StartPopup = () => {
  const divStyle = {
    position: "fixed",
    left: "33%",
    top: "18%",
    width: "550px",
    height: "450px",
    border: "1px solid black",
    borderRadius: "5%",
    zIndex: "10",
    backgroundColor: "white",
  };

  const btnNowStyle = {
    position: "relative",
    top: "80px",
    left: "195px",
    width: "160px",
    height: "95px",
    fontSize: "27pt",
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
    cursor: "pointer"
  };
  const btnNextStyle = {
    position: "absolute",
    top: "270px",
    left: "195px",
    width: "160px",
    height: "95px",
    fontSize: "27pt",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "black",
    cursor: "pointer"
  };
  return (

    <div style={divStyle}>
      <Link to="/gamePage">
        <button style={btnNowStyle} onClick={Start1Btn}>현생</button>
      </Link>
      <Link to="/gamePage">
        <button style={btnNextStyle} onClick={Start2Btn}>환생</button>
      </Link>
    </div>

  );
};

export default StartPopup;
