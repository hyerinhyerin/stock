import React,{Component, useEffect} from "react";
import PropTypes from 'prop-types';
import './JoinComponent.css';
class JoinComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            value:''
        }
    }
    static propTypes={
        JoinP:PropTypes.string.isRequired,
        ipType:PropTypes.string.isRequired
    };
    
    
    
    
    render() {
        const {JoinP, ipType, name, readTF}=this.props;
        return (
             <div>
                <p className="joinp">{JoinP}</p>
                <input name={name} type={ipType} required readOnly={readTF}></input>
             </div>
        );
    }
}
export default JoinComponent;