import React,{Component, useEffect,useState} from "react";
import ProfilePopup from './ProfilePopup';
import ImageCP from "./ImageCP";
import PropTypes from 'prop-types';
const ProfileImage =(props)=>{
    //팝업창 view
    const [popview, setPopview]=useState(false);
    const [datas, setDatas]=useState([
        {id:1, image:'profile_2.png'},
        {id:2, image:'profile_3.png'},
        {id:3, image:'profile_4.png'},
        {id:4, image:'profile_5.png'},
    ]);
    const [item, setItem]=useState(datas[1]); //유저 프로필 이미지
    //배열에서 클릭 이미지 찾기->ImageCP.js 파일에서 사용. 
    const onView=(id)=>{
        setItem(datas.find(item=>item.id===id));
    }

    //이미지 마우스 올리면 편집이미지 나타남
    const overMouse=e=>{
        e.target.style.opacity='100%'
    }
    //마우스 벗어나면 없어짐. 
    const outMouse=e=>{
        e.target.style.opacity='0%'
    }

    const getData=(imgclick)=>{
        setPopview(imgclick);
    }

    const circleStyle={
        display:'inline-block',
        position:'relative',
        zIndex:'5',
        height:'150px',//20vh
        width:'150px',
        left:'705px', //92.5vh
        marginTop:'90px', //13vh
        // marginBottom:'-50px',
        borderRadius: '50%',
        border: '1px solid white',
        backgroundColor:'none',

    };
    const imgStyle={
        position:'absolute',
        // left: '-60px',
        // top: '-190px',
        left:'-10px',
        top:'-8px',
        zIndex:'1',
    }
    const editImgStyle={
        position:'relative',
        opacity:'0%',
        zIndex:'2',
        borderRadius: '50%',

    }

    const idstyle={
        position:'relative',
        textAlign:'center',
        marginLeft:'25px',
        color:'white',
        fontSize:'15pt',
    }

    return (
        <div>
            <div className="circle" style={circleStyle}>
                <img style={imgStyle} className="myimg" src={item.image}></img>
                <img style={editImgStyle} className="editimg" src="edit.png" onMouseOver={overMouse} onMouseOut={outMouse}
                onClick={()=>{setPopview(true);}}></img>
            </div>
            <p style={idstyle}>{props.id}</p>
            <div>
                {popview? <ProfilePopup popShow={popview} datas={datas} item={item} onView={onView} getData={getData}/> : ''}
            </div>
        </div>

    );
    }
export default ProfileImage;

////////////////////////클래스형
// import React,{Component, useEffect} from "react";
// import ProfilePopup from './ProfilePopup';
// import ImageCP from "../Component/ImageCP";
// import PropTypes from 'prop-types';
// class ProfileImage extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             imgShow:0,
//             // imgroot:'profile_2.png'
//             datas:[
//                 {id:1, image:'profile_2.png'},
//                 {id:2, image:'profile_3.png'},
//                 {id:3, image:'profile_4.png'},
//                 {id:4, image:'profile_5.png'},
//             ],
//             item:datas[0],
//         };
//     }
//     //이미지 마우스 올리면 편집이미지 나타남
//     overMouse=e=>{
//         e.target.style.opacity='100%'
//         // this.setState({isHover:1});
//     }
//     //마우스 벗어나면 없어짐. 
//     outMouse=e=>{
//         e.target.style.opacity='0%'
//         // this.setState({isHover:0});
//     }

//     getData=(imgsrc)=>{
//         // this.setState(()=>{
//         //     this.imgroot=imgsrc;
//         // })
//         this.imgroot=imgsrc;
//         console.log(this.imgroot);
//     }

//     render() {

//         let {imgShow,imgroot,datas}=this.state;

//         const circleStyle={
//             position:'relative',
//             zIndex:'5',
//             height:'150px',
//             width:'150px',
//             left:'705px',
//             marginTop:'90px',
//             marginBottom:'-50px',
//             borderRadius: '50%',
//             border: '1px solid white',
//             backgroundColor:'none',
//         };
//         const imgStyle={
//             position:'absolute',
//             // left: '-60px',
//             // top: '-190px',
//             left:'-10px',
//             top:'-8px',
//             zIndex:'1',
//         }
//         const editImgStyle={
//             position:'relative',
//             opacity:'0%',
//             zIndex:'2',
//             borderRadius: '50%',

//         }

//         const idstyle={
//             position:'relative',
//             textAlign:'center',
//             marginLeft:'25px',
//             color:'white',
//             fontSize:'15pt',
//         }

//         ////////팝업창에서 이미지 누르면 프로필 이미지 변경되는..
//         //bind? 리렌더링? setState 변수 변경? 뭘 하면 될까 
//         // const getData=(imgsrc)=>{
//         //     // this.setState(()=>{
//         //     //     imgroot=imgsrc;
//         //     // })
//         //     this.imgroot=imgsrc;
//         //     // console.log(this.imgroot);
//         //     console.log(this.imgroot);
//         // }
//         // const imgListstyle={
//         //     position:'absolute',
//         //     left:'-10px',
//         //     top:'-10px',
//         //     zIndex:'1',
//         // }

    
        
//         return (
//             <div>
//                 <div className="circle" style={circleStyle}>
//                     <img style={imgStyle} className="myimg" src={'profile_2.png'}></img>
//                     <img style={editImgStyle} className="editimg" src="edit.png" onMouseOver={this.overMouse} onMouseOut={this.outMouse}
//                     onClick={()=>{this.setState({imgShow:1}); console.log(this.item)}}></img>
//                     {/* <ImageCP imgstyle={imgStyle} imgsrc={'profile_5.png'} imgClick={imgClick} getData={getData}/> */}
//                 </div>
//                 <p style={idstyle}>I'm ID</p>
//                 <div>
//                     <ProfilePopup imgShow={imgShow} getData={this.getData}/>
//                 </div>
//             </div>

//         );
//     }
// }
// export default ProfileImage;