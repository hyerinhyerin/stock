import React,{useState} from 'react';
import JoinComponent from '../Component/JoinComponent';
import ImageCP from '../Component/ImageCP';
import Button from '../Component/Button';
import '../Join/Join.css';

const Mypage = () => {

    const editStyle={
        position:'absolute',
        right:'270px',
        bottom:'30px',
    }
    const outStyle={
        position:'absolute',
        right:'100px',
        bottom:'30px',
    }

    const btnStyle={
      width:'120px',
      height:'55px',
      border:'1px solid white',
      backgroundColor:'black',
      fontSize:'15pt',
      color:'white',
  }
  return(
    <div>
      <ImageCP/>
      <div className="Join">
        <JoinComponent JoinP="닉네임" ipType="text"/>
        <JoinComponent JoinP="아이디" ipType="text"/>
        {/* <JoinComponent JoinP="SNS ID" ipType="text"/> */}
        <JoinComponent JoinP="비밀번호" ipType="password"/>
        <JoinComponent JoinP="이메일" ipType="email"/>
      </div> 
      <div style={editStyle}>
        <Button btnStyle={btnStyle} btnText='수정'/>
      </div>
      <div style={outStyle}>
        <Button btnStyle={btnStyle} btnText='탈퇴'/>
      </div>
    </div>
      
  );
}

export default Mypage;