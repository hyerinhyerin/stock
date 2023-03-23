import React,{useState} from 'react';
import Button from '../components/Button';

const StartPopup = () => {

    const divStyle={
        position:'fixed',
        left:'33%',
        top:'18%',
        width:'550px',
        height:'450px',
        border:'1px solid black',
        borderRadius:'5%',
        zIndex:'10',
        backgroundColor:'white',

    }
    
    const btnNowStyle={
        position:'relative',
        top:'80px',
        left:'195px',
        width:'160px',
        height:'95px',
        fontSize:'27pt',
        fontWeight:'bold',
        color:'black',
        backgroundColor:'white',
    }
    const btnNextStyle={
        position:'absolute',
        top:'270px',
        left:'195px',
        width:'160px',
        height:'95px',
        fontSize:'27pt',
        fontWeight:'bold',
        color:'white',
        backgroundColor:'black',
        
    }
  return(
    <div style={divStyle}>
        <Button btnStyle={btnNowStyle} btnText='현생'/>
        <Button btnStyle={btnNextStyle} btnText='환생'/>
    </div>
      
  );
}

export default StartPopup;