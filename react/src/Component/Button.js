import React,{Component} from "react";
import PropTypes from 'prop-types';

class Button extends Component{
    static propTypes={
        btnText:PropTypes.string
    }
    render() {
        // const btnStyle1={
        //     width:'120px',
        //     height:'55px',
        //     border:'1px solid white',
        //     backgroundColor:'black',
        //     fontSize:'15pt',
        //     color:'white',
        //     borderRadius:'50%',
        // };
        const {btnText, btnStyle}=this.props;
        return (
             <div>
                <button style={btnStyle}>{btnText}</button>
             </div>
        );
    }
}
export default Button;