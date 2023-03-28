import axios from "axios";
import React, { useEffect, useState } from "react";
import Graph from "./stockChart";

const graphCpt = () => {
  const divStyle = {
    display: "inline-block",
    border: "1px solid white",
    width: "1123px",
    height: "550px",
    marginTop: "20px",
    marginLeft: "35px",
  };
  const graphStyle = {
    display: "inline-block",
    borderRight: "1px solid white",
    marginTop: 0,
  };

  return (
    <div style={divStyle}>
      <div style={graphStyle}>
        <Graph />
      </div>
      <div></div>
    </div>
  );
};

export default graphCpt;
