import React,{useState, useRef, useEffect} from 'react';
import ImageCP from './ImageCP';

const ProfilePopup = (props) => {
    const divStyle={
        position:'fixed',
        left:'67%',
        top:'10%',
        width:'450px',
        height:'530px',
        border:'1px solid white',
        borderRadius:'5%',
        // zIndex:'10',
        backgroundColor:'black',

    }

    const xstyle={
        position:'absolute',
        right:'15px',
        top:'13px',
    }

    const p1style={
        padding:'20px 0px 0px 38px',
        fontSize:'20pt',
        color:'white',
    }

    const p2style={
        padding:'0px 0px 0px 38px ',
        marginTop:'-7px',
        fontSize:'12pt',
        color:'white',
    }

    const imgListstyle={
        position:'absolute',
        left:'-10px',
        top:'-10px',
        zIndex:'1',

    }

    //////////팝업창 없애기
    const popexit=()=>{
        props.getData(!props.popShow);
    }
  return(
    <div style={divStyle} >
        <img style={xstyle} src="x.png" onClick={popexit}></img> 
        <p style={p1style}>프로필 변경</p>
        <p style={p2style}>프로필 이미지를 선택하세요.</p>
        <ImageCP imgstyle={imgListstyle} id={props.datas[0].id} imgsrc={props.datas[0].image} onView={props.onView} popShow={props.popShow} getData={props.getData}/>
        <ImageCP imgstyle={imgListstyle} id={props.datas[1].id} imgsrc={props.datas[1].image} onView={props.onView} popShow={props.popShow} getData={props.getData}/>
        <ImageCP imgstyle={imgListstyle} id={props.datas[2].id} imgsrc={props.datas[2].image} onView={props.onView} popShow={props.popShow} getData={props.getData}/>
        <ImageCP imgstyle={imgListstyle} id={props.datas[3].id} imgsrc={props.datas[3].image} onView={props.onView} popShow={props.popShow} getData={props.getData}/>
    </div>
      
  );
}

export default ProfilePopup;