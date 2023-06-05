import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

const NewPanel = ({ sendDataToGraphCpt }) => {
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

  const [stockSituations, setStockSituations] = useState([]);
  const [currentSituation, setCurrentSituation] = useState(null);
  const [nextSituationTime, setNextSituationTime] = useState(0);
  const [situationNum, setSituationNum] = useState(null);
  const [testData, setTestData] = useState({});

  useEffect(() => {
    const axiosStockSituations = async () => {
      try {
        const situationData = await axios.get("/api/situation");
        const situationList = situationData.data.situation.map(
          (obj) => obj.situation
        );
        setStockSituations(situationList);

        // 초기 마운트 시 상황 설정
        setCurrentSituation(getRandomSituation(stockSituations));
      } catch (error) {
        console.log(error);
      }
    };

    axiosStockSituations();

    // return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchNextSituation = async () => {
      const isDefault = Math.random() < 0.5; // 50% 확률로 default

      if (isDefault) {
        setCurrentSituation("평화로움");
        setSituationNum(null);
        postSituationNum(situationNum);
      } else {
        setCurrentSituation(
          getRandomSituation(
            stockSituations.filter((situation) => situation !== "평화로움")
          )
        );
        postSituationNum(situationNum);
      }

      // 다음 상황 발생 시간 설정 (20~40초)
      const situationTime = Math.floor(Math.random() * 21) + 20;
      setNextSituationTime(situationTime);
    };

    console.log("nextSituationTime : ", nextSituationTime);

    const timer = setInterval(fetchNextSituation, nextSituationTime * 1000);

    return () => clearInterval(timer);
  }, [stockSituations, nextSituationTime]);

  const getRandomSituation = (situations) => {
    const randomIndex = Math.floor(Math.random() * situations.length);
    setSituationNum(randomIndex);
    return situations[randomIndex];
  };

  // 서버로 회사 num값 보내기
  const postSituationNum = async (idx) => {
    const axiosSituationIdx = await axios
      .post("/api/situationTest", {
        num: idx,
      })
      .then((res) => {
        console.log("상황 resData : ", res.data);
        sendDataToGraphCpt(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={divStyle}>
      <span style={newsFlashStyle}>속보 </span>
      {currentSituation ? (
        <span style={newsContent}>{currentSituation}</span>
      ) : (
        <span style={newsContent}>평화로움</span>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  sendDataToGraphCpt: (data) =>
    dispatch({ type: "SET_DATA_FROM_NewPanel", payload: data }), // A 컴포넌트로 데이터 전달
});

export default connect(null, mapDispatchToProps)(NewPanel);
