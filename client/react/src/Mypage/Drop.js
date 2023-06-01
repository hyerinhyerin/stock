import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './Drop.css';
const Drop = (props) => {
    // useEffect(()=>{
    //     setView(props.view);
    //     console.log(props.view);
    // },[props.view]);

    const handleDrop=async(e)=>{
        e.preventDefault();
    
        try{
          const response=await axios.post("/api/mypage", props.formData);
          console.log("탈퇴중");
        }catch(e){
          console.error(e);
        }
      };

    const divStyle={
        position:'fixed',
        left:'33%',
        top:'33%',
        width:'550px',
        height:'200px',
        border:'1px solid black',
        borderRadius:'20px',
        zIndex:'10',
        backgroundColor:'white',
    }
    
    const btnYes={
        position:'relative',
        top:'20px',
        left:'70px',
        width:'170px',
        height:'40px',
        fontSize:'13pt',
        border:'1px solid #ac354b',
        color:'white',
        backgroundColor:'#ac354b',
    }
    const btnNo={
        position:'relative',
        top:'20px',
        left:'140px',
        width:'175px',
        height:'40px',
        fontSize:'13pt',
        border:'1px solid #ac354b',
        color:'white',
        backgroundColor:'#ac354b',
        
    }

    const pstyle={
        marginLeft:'125px',
        marginTop:'60px',
        fontSize:'15pt',
        fontWeight:'bold',
    }
    //마이페이지에 팝업창 사라짐을 넘김. 
    const clickBack=()=>{
        props.getData(!props.view);
    }
  return(
    <div style={divStyle}>
        <p className='drop'>진짜 정말 진심으로 탈퇴하시겠습니까?</p>
        <form onSubmit={handleDrop}>
            <button type='submit' style={btnYes}>네. 안녕히 계세요.</button>
            <button style={btnNo} onClick={clickBack}>아뇨. 잘못 눌렀어요.</button>
        </form>
    </div>
      
  );
}

export default Drop;