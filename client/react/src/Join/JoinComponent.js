import React,{Component, useEffect} from "react";
import PropTypes from 'prop-types';
import './JoinComponent.css';
class JoinComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            value:'',
            inputValue:''
        }
    }
    static propTypes={
        JoinP:PropTypes.string.isRequired,
        ipType:PropTypes.string.isRequired
    };
    
    //input 값 받기 
    handleInputChange=(e)=>{
        this.setState({inputValue:e.target.value});
    };
    
    
    render() {
        const {JoinP, ipType, name, getData}=this.props;
        const {inputValue}=this.state;
        return (
             <div>
                <p className="joinp">{JoinP}</p>
                <input name={name} type={ipType} value={inputValue} onChange={this.handleInputChange} getData={getData(name,inputValue)} required></input>
             </div>
        );
    }
}
export default JoinComponent;