import React,{useEffect, useState} from 'react';
import JoinComponent from '../components/JoinComponent';
import Button from '../components/Button';
import './Join.css';

const Join = () => {

  const btnStyle={
    position:'absolute',
    width:'120px',
    height:'55px',
    marginTop:'62px',
    // marginLeft:'30px',
    right:'62px',
    // bottom:'60px',
    border:'1px solid white',
    backgroundColor:'black',
    fontSize:'15pt',
    color:'white',
  }
  return(
      <div className="Join">
        <form action="/auth/join" method="POST">
          <JoinComponent name="nickname" JoinP="닉네임" ipType="text"/>
          <input type='checkbox'/><p className='nickP'>닉네임 중복 확인</p>
          <JoinComponent name="id" JoinP="아이디" ipType="text"/>
          <input type='checkbox'/><p className='checkP'>아이디 중복 확인</p>
          <JoinComponent name="pw" JoinP="비밀번호" ipType="password"/>
          <JoinComponent name="pwcheck" JoinP="비밀번호 확인" ipType="password"/>
          <JoinComponent name="email" JoinP="이메일" ipType="email"/>
          <button style={btnStyle}>확인</button>
      </form>
    </div>
  );
};

export default Join;
