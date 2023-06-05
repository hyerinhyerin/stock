import { use } from "passport";
import React from "react";
import { useMediaQuery } from "react-responsive";
///////////반응형 화면
/////화면 최대 너비가 768이면 모바일로 취급
export const Mobile=({children})=>{
    const isMobile=useMediaQuery({
        query : "(max-width:768px)"
    });
    return <>{isMobile && children}</>
}

/////화면 최소 너비가 769면 pc로 취급
export const PC = ({children})=>{
    const isPC = useMediaQuery({
        query: "(min-width:769px)"
    });
    return <>{isPC&&children}</>
}