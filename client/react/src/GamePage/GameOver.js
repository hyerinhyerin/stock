import React, { useState } from "react";
import {Link} from "react-router-dom";
import "./gameover.css";
const GameOver = (props) => {
  return (
    <div className="popupDiv">
      <p className="overP">Game Over</p>
      <button className="rankBtn">랭킹보기</button>
    </div>
  );
};

export default GameOver;