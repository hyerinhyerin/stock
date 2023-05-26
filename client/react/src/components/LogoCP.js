import React,{useState} from 'react';

const LogoCP = () => {

    const imgstyle={
        position:'absolute',
        width:'100px',
        height:'65px',
        top:'25px',
        left:'20px',
    }
  return(
    <div>
      <img style={imgstyle} className='logoimg' src='logo(1).png'></img>
    </div>
      
  );
}

export default LogoCP;