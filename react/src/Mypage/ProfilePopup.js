import React,{useState, useRef, useEffect} from 'react';
import ImageCP from '../Component/ImageCP';

const ProfilePopup = (props) => {
    const [imgClick, setimgClick]=useState(props.imgShow);

    //ProfileImage에서 imgShow 변수가 바뀔 때(즉, 이미지가 눌렸을 때) 팝업창 뜨도록
    useEffect(()=>{
        setimgClick(props.imgShow);
        console.log(props.imgShow);
        return()=>{
            
        };
    },[props.imgShow]);

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
        opacity:imgClick,

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

    const getData=(imgclick)=>{
        setimgClick(imgclick);
        console.log('팝업창',imgclick);
        props.getData(imgclick);
    }
    const click=()=>{
        console.log(props.imgShow);
    }
  return(
    <div style={divStyle} >
        <p style={p1style} onClick={click}>프로필 변경</p>
        <p style={p2style}>프로필 이미지를 선택하세요.</p>
        <ImageCP imgstyle={imgListstyle} imgsrc={"profile_2.png"} imgClick={imgClick} getData={getData}/>
        <ImageCP imgstyle={imgListstyle} imgsrc={"profile_3.png"} imgClick={imgClick} getData={getData}/>
        <ImageCP imgstyle={imgListstyle} imgsrc={"profile_4.png"} imgClick={imgClick} getData={getData}/>
        <ImageCP imgstyle={imgListstyle} imgsrc={"profile_5.png"} imgClick={imgClick} getData={getData}/>
    </div>
      
  );
}

export default ProfilePopup;