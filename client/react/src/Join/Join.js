import React,{useEffect, useState} from 'react';
import JoinComponent from './JoinComponent';
import './Join.css';

const Join = () => {
  const [nickname, setNickname]=useState("");
  const [id, setId]=useState("");

  //joincomponent에서 id, nickname 값 받아오기
  const getData=(name, data)=>{
    if(name=="nickname")
    {
      setNickname(data);
      console.log("nickname : ", nickname);
    }
    else if(name=="id")
    {
      setId(data);
      console.log("id : ", id);
    }
  }
  
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
          <JoinComponent name="nickname" JoinP="닉네임" ipType="text" getData={getData}/>
          <button className='btnstyle'>중복 확인</button>
          <JoinComponent name="id" JoinP="아이디" ipType="text" getData={getData}/>
          <button className='btnstyle'>중복 확인</button>
          <JoinComponent name="pw" JoinP="비밀번호" ipType="password" getData={getData}/>
          <JoinComponent name="pwcheck" JoinP="비밀번호 확인" ipType="password" getData={getData}/>
          <JoinComponent name="email" JoinP="이메일" ipType="email" getData={getData}/>
          <button style={btnStyle}>확인</button>
      </form>
    </div>
  );
};

export default Join;
