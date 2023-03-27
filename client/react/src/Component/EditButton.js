import React,{Component} from "react";
class EditButton extends Component{
    
    render() {
        const btnStyle={
            position:'absolute',
            width:'120px',
            height:'55px',
            bottom:'30px',
            right:'200px',
            border:'1px solid white',
            backgroundColor:'black',
            fontSize:'15pt',
            color:'white',
        };
        
        return (
             <div>
                <button style={btnStyle}>수정</button>
             </div>
        );
    }
}
export default EditButton;