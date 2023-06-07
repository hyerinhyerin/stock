import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

const NewPanel = ({ sendDataToGraph }) => {
  const divStyle = {
    textAlign: "center",
    border: "1px solid white",
    width: "1123px",
    height: "100px",
    lineHeight: "100px",
    position: "relative",
    marginLeft: "35px",
  };
  const newsFlashStyle = {
    color: "white",
    marginLeft: "25px",
    fontSize: "50px",
    display: "inline-block",
    verticalAlign: "middle",
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const newsContent = {
    color: "white",
    fontSize: "22px",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    alignItems: "center",
    marginLeft: "96px",
  };

  const [currentSituation, setCurrentSituation] = useState(null);
  const [nextSituationTime, setNextSituationTime] = useState(0);

  useEffect(() => {
    const fetchNextSituation = async () => {
      const isDefault = Math.random() < 0.5; // 50% 확률로 default

      if (isDefault) {
        setCurrentSituation("평화로움");
        postSituationNum(null);
      } else {
        const randomIndex = Math.floor(Math.random() * 49);
        postSituationNum(randomIndex);
      }

      // 다음 상황 발생 시간 설정 (20~40초)
      const situationTime = Math.floor(Math.random() * 21) + 20;
      setNextSituationTime(situationTime);
    };

    const timer = setInterval(fetchNextSituation, nextSituationTime * 1000);

    return () => clearInterval(timer);
  }, [nextSituationTime]);

  // 서버로 회사 num값 보내기
  const postSituationNum = async (idx) => {
    const axiosSituationIdx = await axios
      .get("/api/situation", {
        params: {
          num: idx,
        },
      })
      .then((res) => {
        if (res.data.situation.situation) {
          setCurrentSituation(res.data.situation.situation);
          sendDataToGraph(res.data.situationJudgment);
        } else {
          setCurrentSituation("평화로움");
          sendDataToGraph(res.data.situationJudgment);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={divStyle}>
      <span style={newsFlashStyle}>속보 </span>
      <span style={newsContent}>{currentSituation}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  sendDataToGraph: (data) =>
    dispatch({ type: "SET_DATA_FROM_NEWPANEL", payload: data }), // A 컴포넌트로 데이터 전달
});

export default connect(null, mapDispatchToProps)(NewPanel);
