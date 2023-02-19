import React,{useEffect, useState} from 'react';
import JoinComponent from '../Component/JoinComponent';
import Button from '../Component/Button';
import './Join.css';

const Join = () => {

  const btnStyle={
    position:'absolute',
    width:'120px',
    height:'55px',
    // marginTop:'40px',
    // marginLeft:'30px',
    right:'62px',
    bottom:'60px',
    border:'1px solid white',
    backgroundColor:'black',
    fontSize:'15pt',
    color:'white',
  }
  return(
      <div className="Join">
        <JoinComponent JoinP="닉네임" ipType="text"/>
        <input type='checkbox'/><p className='nickP'>닉네임 중복 확인</p>
        <JoinComponent JoinP="아이디" ipType="text"/>
        <input type='checkbox'/><p className='checkP'>아이디 중복 확인</p>
        <JoinComponent JoinP="비밀번호" ipType="text"/>
        <JoinComponent JoinP="비밀번호 확인" ipType="text"/>
        <JoinComponent JoinP="이메일" ipType="email"/>
        <Button btnStyle={btnStyle} btnText={'확인'}/>
      </div> 
  );
}

export default Join;
