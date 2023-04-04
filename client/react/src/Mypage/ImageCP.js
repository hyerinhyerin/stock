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

    return(
        <div style={imgDivStyle} onClick={()=>{props.onView(props.id); props.getData(!props.popShow);}}>
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