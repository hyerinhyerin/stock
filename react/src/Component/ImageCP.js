import React,{Component} from "react";
import PropTypes from 'prop-types';
class ImageCP extends Component{
    
    render() {
        const circleStyle={
            position:'relative',
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
            position:'relative',
            // width:'170px',
            // height:'170px',
            left:'-10px',
            top:'-10px',
        }
        return (
             <div className="circle" style={circleStyle}>
                <img style={imgStyle} className="myimg" src="profile_2.png"></img>
             </div>
        );
    }
}
export default ImageCP;