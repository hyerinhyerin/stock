import React,{useState} from 'react';
import JoinComponent from '../Component/JoinComponent';
import ProfileImage from './ProfileImage';
import Button from '../Component/Button';
import StartPopup from '../Component/StartPopup';
// import '../Join/Join.css';

const Mypage = () => {

  const divStyle={
    textAlign: 'center',
    // marginTop: '50px', 인풋창막는 경우
    marginTop:'100px', //아이디 올리는 경우
  }
  const editStyle={
      position:'absolute',
      right:'230px',
      bottom:'60px',
  }
  const outStyle={
      position:'absolute',
      right:'60px',
      bottom:'60px',
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
      <ProfileImage/>
      <div style={divStyle}>
        <JoinComponent JoinP="닉네임" ipType="text"/>
        {/* <JoinComponent JoinP="아이디" ipType="text"/> */}
        {/* <JoinComponent JoinP="비밀번호" ipType="password"/> */}
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