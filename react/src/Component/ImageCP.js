import React,{Component} from "react";
const ImageCP = (props) => {

    const imgDivStyle={
        display:'inline-block',
        position: 'relative',
        zIndex: '5',
        height: '150px',
        width: '150px',
        marginTop:'30px',
        marginLeft:'50px',
        // borderRadius: '50%',
        // border: '1px solid white',

    }
    //이미지 하나 클릭하면 팝업창 사라지는 함수
    const onClick=()=>{
        console.log(props.imgClick);
        if(props.imgClick=='1'){
            props.getData(0);
        }
        //else{
        //     props.getData(0);
        // }
    }
    return(
        <div style={imgDivStyle} onClick={onClick}>
            <img style={props.imgstyle} src={props.imgsrc}></img>
        </div>
    );
}

export default ImageCP;




// class ImageCP extends Component{
//     constructor(props){
//         super(props);
//         // this.state={
//         //   imgClick:0,  
//         // };
//     }


//     render() {
//         const {imgstyle,imgsrc, imgClick}=this.props;

//         const imgDivStyle={
//             display:'inline-block',
//             position: 'relative',
//             zIndex: '5',
//             height: '150px',
//             width: '150px',
//             marginTop:'30px',
//             marginLeft:'50px',
//             // borderRadius: '50%',
//             // border: '1px solid white',

//         }
//         const onClick=()=>{
//             console.log(imgClick);
//             if(imgClick=='0'){
//                 this.props.ClickimgHide(1);
//             }else{
//                 this.props.ClickimgHide(0);
//             }
//         }
//         return (
//              <div style={imgDivStyle} onClick={onClick}>
//                 <img style={imgstyle} src={imgsrc}></img>
//              </div>
//         );
//     }
// }