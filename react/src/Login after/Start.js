import React,{Component} from "react";
import Button from "../Component/Button";
import './Start.css';
const Start = (props) => {

    const btnStyle={
        position:'absolute',
        right:'110px',
        bottom:'65px',
        width:'180px',
        height:'55px',
        backgroundColor:'black',
        border:'1px solid white',
        color:'white',
        fontSize:'20pt',
    }
    return(
        <div>
            <div className="circle">
                <img className="profileImg" src={'profile_2.png'}></img>
            </div>
            <div className="balloon">
                <p className="P1">내 정보</p>
                <p className="P2">닉네임 <pre>        </pre></p>
                <p className="P2">총 자산 <pre>        </pre></p>
                <p className="P2">랭킹 순위 <pre>        </pre></p>
            </div>
            <Button btnText={'게임 시작'} btnStyle={btnStyle}/>
        </div>
    );
}

export default Start;