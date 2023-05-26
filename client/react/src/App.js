import React, { useState } from 'react';
import {Mobile, PC} from './components/Responsive';
import Mypage from './Mypage/Mypage';
import LogoCP from './components/LogoCP';
import Start from './Login after/Start';
import Join from './Join/Join';
import './App.css';
////연동 테스트 
import axios from "axios";
import { useEffect } from 'react';

const App = () => {
  const [data, setData]=useState();
  const callApi = async()=>{
    axios.get("/api").then((res)=>{console.log(res.data.test); setData(res.data.test);});
  };

  useEffect(()=>{
    callApi();
  }, []);

  return (
  <div> 
    <PC>
      {/* <LogoCP/> */}
      <Mypage/>
    </PC>
    <Mobile>
    </Mobile>
  </div>
  );
};

export default App;