import React from "react";

const LimitAlert=(props)=>{
    const divStyle={
        position:"fixed",
        left:"17.2%",
        // top:"45%", //중앙
        top:"-2%", //상단
        width:"330px",
        height:"45px",
        // border:"2px solid white",
        zIndex:"10",
        backgroundColor:"black"
      }
    const pStyle={
        // marginTop:"13px",
        textAlign:"center",
        // color:"white",
        color:"#ac354b",
        fontSize:"15pt"
    }
    return (
      <div style={divStyle}>
        <p style={pStyle}>주문금액이 보유 자산보다 많습니다.</p>
      </div>
    );
};
export default LimitAlert;