import React,{useState, useRef, useEffect} from 'react';
import ImageCP from '../Component/ImageCP';

const ProfilePopup = (props) => {
    const [imgClick, setimgClick]=useState(props.imgShow);

    //ProfileImage에서 imgShow 변수가 바뀔 때(즉, 이미지가 눌렸을 때) 팝업창 뜨도록
    useEffect(()=>{
        setimgClick(props.imgShow);
        console.log(props.imgShow);
        // return()=>{
        //     props.getData(imgClick);
        // };
    },[props]);//props

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

    //이미지 컴포넌트에서 클릭 0을 받아 팝업창 사라짐을 ProfileImage.js에 밝힘
    const getData=(imgclick)=>{
        setimgClick(imgclick);
        console.log('팝업창',imgclick);
        props.getData(imgclick);
        // props.imgroot=imgsrc;
    }

  return(
    <div style={divStyle} >
        <p style={p1style}>프로필 변경</p>
        <p style={p2style}>프로필 이미지를 선택하세요.</p>
        <ImageCP imgstyle={imgListstyle} id={props.datas[0].id} imgsrc={props.datas[0].image} onView={props.onView} imgClick={imgClick} getData={getData}/>
        <ImageCP imgstyle={imgListstyle} id={props.datas[1].id} imgsrc={props.datas[1].image} onView={props.onView} imgClick={imgClick} getData={getData}/>
        <ImageCP imgstyle={imgListstyle} id={props.datas[2].id} imgsrc={props.datas[2].image} onView={props.onView} imgClick={imgClick} getData={getData}/>
        <ImageCP imgstyle={imgListstyle} id={props.datas[3].id} imgsrc={props.datas[3].image} onView={props.onView} imgClick={imgClick} getData={getData}/>
    </div>
      
  );
}

export default ProfilePopup;