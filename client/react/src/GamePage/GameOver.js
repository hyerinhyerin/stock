import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./gameover.css";
const GameOver = (props) => {
  axios.get("/api/gameOver");
  return (
    <div className="popupDiv">
      <p className="overP">Game Over</p>
      <button className="rankBtn">랭킹보기</button>
    </div>
  );
};

export default GameOver;