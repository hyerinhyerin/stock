import React,{Component, useEffect} from "react";
import ProfilePopup from './ProfilePopup';
import ImageCP from "../Component/ImageCP";
import PropTypes from 'prop-types';
class ProfileImage extends Component{
    constructor(props){
        super(props);
        this.state={
            // isHover:0,
            imgShow:0,
        };
    }
    //이미지 마우스 올리면 편집이미지 나타남
    overMouse=e=>{
        e.target.style.opacity='100%'
        // this.setState({isHover:1});
    }
    //마우스 벗어나면 없어짐. 
    outMouse=e=>{
        e.target.style.opacity='0%'
        // this.setState({isHover:0});
    }


    render() {

        let {imgShow}=this.state;

        const circleStyle={
            position:'relative',
            zIndex:'5',
            height:'150px',
            width:'150px',
            left:'705px',
            marginTop:'90px',
            marginBottom:'-50px',
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

        const getData=(imgclick)=>{
            this.setState(()=>{
                imgShow=imgclick;
            })
            console.log("imgShow 변수 바뀜",imgShow);
        }
        // const imgListstyle={
        //     position:'absolute',
        //     left:'-10px',
        //     top:'-10px',
        //     zIndex:'1',
        // }

    
        // const ClickEdit=()=>{this.setState({imgShow:1});console.log(imgShow)}
        
        return (
            <div>
                <div className="circle" style={circleStyle}>
                    <img style={imgStyle} className="myimg" src="profile_5.png"></img>
                    <img style={editImgStyle} className="editimg" src="edit.png" onMouseOver={this.overMouse} onMouseOut={this.outMouse}
                    onClick={()=>{this.setState({imgShow:1}); console.log(imgShow)}}></img>
                    {/* <ImageCP imgstyle={imgStyle} imgsrc={'profile_5.png'} imgClick={imgClick} getData={getData}/> */}
                </div>
                <p style={idstyle}>정혜린입니다.</p>
                <div>
                    <ProfilePopup imgShow={imgShow} getData={getData}/>
                </div>
            </div>

        );
    }
}
export default ProfileImage;