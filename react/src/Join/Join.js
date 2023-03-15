import React,{useEffect, useState} from 'react';
import JoinComponent from '../Component/JoinComponent';
import './Join.css';

const Join = () => {


  return(
      <div className="Join">
        <JoinComponent JoinP="닉네임" ipType="text"/>
        <input type='checkbox'/><p className='nickP'>닉네임 중복 확인</p>
        <JoinComponent JoinP="아이디" ipType="text"/>
        <input type='checkbox'/><p className='checkP'>아이디 중복 확인</p>
        <JoinComponent JoinP="SNS ID" ipType="text"/>
        <JoinComponent JoinP="비밀번호" ipType="text"/>
        <JoinComponent JoinP="비밀번호 확인" ipType="text"/>
        <JoinComponent JoinP="이메일" ipType="email"/>
      </div> 
  );
}

export default Join;
