import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import axios from "axios";
import btnImg from "../img/btn.png";

const backfun = require("../backFun/random");

function Chart() {
  const [stockCompanies, setStockCompanies] = useState([]); // 데베에서 꺼내온 회사 정보
  const [selectedCompany, setSelectedCompany] = useState(Array(30).fill({})); // 선택한 회사
  const [realGroupedCompanies, setRealGroupedCompanies] = useState([]); // 2차원 배열로 회사의 정보를 관리
  const [selectedCompanyName, setSelectedCompanyName] = useState(null); // 선택한 회사 이름을 담을 state 변수
  const [isDiv2Visible, setIsDiv2Visible] = useState(false);

  useEffect(() => {
    const axiosData = async () => {
      const companys = await axios.get("/api/chart"); // 데베에서 여러개의 회사 정보 가져오기
      console.log("데베에서 받아온 초기 데이터 : ", companys.data.companys);
      setStockCompanies(companys.data.companys);

      // 데베에서 가져온 1차 회사데이터 차트에 쓸 양식에 맞게 변환 useEffect
      const newStockDataArr = companys.data.companys.map((company) => {
        const randomNum = backfun.startNum(); // 랜덤 숫자 생성
        const randomPM = backfun.startOp(); // 랜덤 부호 생성 +/-
        const stck_clpr = company.stockprice;
        let stck_oprc = 50000; // 시가
        let acml_vol = 50; // 거래량
        let prdy_vrss_sign = 0; // 음봉 양봉 기준
        if (randomPM === "+") {
          stck_oprc = stck_clpr + randomNum;
          acml_vol += randomNum;
          prdy_vrss_sign = 2;
        } else if (
          randomPM === "-" &&
          stck_oprc > randomNum &&
          stck_clpr > randomNum
        ) {
          stck_oprc = stck_clpr - randomNum;
          acml_vol = Math.max(acml_vol - randomNum, 0);
          prdy_vrss_sign = 4;
        }
        return {
          // 차트에 쓸 양식의 회사 데이터 객체
          name: company.companyname,
          stck_bsop_date: 1,
          prdy_vrss_sign,
          stck_oprc,
          stck_clpr,
          acml_vol,
          stockCount: company.companystock,
        };
      });

      // 회사 데이터로 쓸 2차원 배열 초기화 회사의 개수는 22개
      const groupedCompanies = Array.from({ length: 22 }, () =>
        Array.from({ length: 30 }, () => ({}))
      );

      // stockDataArr의 데이터를 2차원 배열에 넣기
      for (let i = 0; i < newStockDataArr.length; i++) {
        groupedCompanies[i % 22][29] = newStockDataArr[i];
      }

      // const randomIdx = Math.floor(Math.random() * realGroupedCompanies.length);
      setRealGroupedCompanies(groupedCompanies);

      const earlyCompanyPriceUpdate = async () => {
        axios.post("/api/curentdata", groupedCompanies).catch((err) => {
          console.error(err);
        });
      };
      earlyCompanyPriceUpdate();
      console.log("axios로 보낼거 : ", groupedCompanies);

      // 처음 렌더링될 때 0~21 중 하나의 인덱스를 랜덤하게 선택
      const randomIdx = Math.floor(Math.random() * 22);
      // 선택한 회사 정보를 selectedCompany state에 업데이트
      setSelectedCompanyName(groupedCompanies[randomIdx][29].name);
      // 초기에 랜덤한 인덱스로 회사 이름을 하나 저장해 초기 렌더링에 랜덤한 회사 데이터 차트에 표현
    };

    axiosData();
  }, []);

  // 새롭게 지속적으로 업데이트될 각 회사데이터 공정 과정 함수화1
  const createNewCompanyData = (prevData) => {
    const randomPr = backfun.startNum();
    const randomPM = backfun.startOp();

    const newData = { ...prevData };
    if (randomPM === "+") {
      newData.stck_bsop_date += 1;
      newData.prdy_vrss_sign = 2;
      newData.stck_clpr = newData.stck_oprc;
      newData.stck_oprc += randomPr;
      newData.acml_vol += randomPr;
    } else if (
      randomPM === "-" &&
      newData.stck_clpr > randomPr &&
      newData.stck_clpr > randomPr
    ) {
      newData.stck_bsop_date += 1;
      newData.prdy_vrss_sign = 4;
      newData.stck_clpr = newData.stck_oprc;
      newData.stck_oprc -= randomPr;
      newData.acml_vol -= randomPr;
      // 거래량이 0 이하로 떨어지지 않도록 함
      newData.acml_vol = Math.max(newData.acml_vol, 0);
    }

    return newData;
  };

  // 새롭게 지속적으로 업데이트될 각 회사데이터 공정 과정 함수화2
  const updateCompanies = () => {
    setRealGroupedCompanies((prevCompanies) => {
      const newCompanies = prevCompanies.map((companyData) => {
        const newCompanyData = createNewCompanyData(companyData[29]);
        const newDataArray = [...companyData.slice(1), newCompanyData];
        return newDataArray;
      });
      const companyPriceUpdate = async () => {
        axios.post("/api/curentdata", newCompanies).catch((err) => {
          console.error(err);
        });
      };
      companyPriceUpdate();
      return newCompanies;
    });
  };

  // 새로운 데이터를 일정시간마다 realGroupedCompanies state에 추가
  useEffect(() => {
    const intervalId = setInterval(updateCompanies, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const marginZero = {
    margin: 0,
  };

  const btnStyle = {
    width: "176px",
    height: "70px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderBottom: "1px solid white",
    fontSize: "20px",
    margin: "0px 10px",
  };

  const divStyle = {
    // display: "none",
    position: "absolute",
    padding: "100px 70px",
    margin: 0,
    border: "1px solid white",
    zIndex: 1,
    width: "982px",
    top: "161px",
    background: "black",
  };

  function companyBtnClick(companyName) {
    setSelectedCompanyName(companyName);
    setIsDiv2Visible(!isDiv2Visible);
  }

  // 회사 이름을 추출하여 버튼 생성
  const buttons = realGroupedCompanies.map((company) => (
    <button
      style={btnStyle}
      key={company[29].name}
      onClick={() => companyBtnClick(company[29].name)}
    >
      {company[29].name}
    </button>
  ));

  const handleButtonClick = () => {
    setIsDiv2Visible(!isDiv2Visible);
  };

  //selectedCompanyName state 변수가 변경될 때마다 선택한 회사 정보를 추출하여 selectedCompany state 변수에 저장
  useEffect(() => {
    if (selectedCompanyName) {
      const company = realGroupedCompanies.find(
        (company) => company[29].name === selectedCompanyName
      );
      setSelectedCompany(company);
      console.log("selectedCompany 최종본 : ", selectedCompany);
    }
  }, [selectedCompanyName, realGroupedCompanies]);

  return (
    <div style={marginZero}>
      <button
        onClick={handleButtonClick}
        style={{
          background: "black",
          position: "relative",
          right: "39px",
          bottom: "56px",
          border: "none",
        }}
      >
        <img src={btnImg} style={{ width: "22px" }} />
      </button>
      {isDiv2Visible && <div style={divStyle}>{buttons}</div>}
      <div style={{ position: "absolute", top: "148px", left: "36px" }}>
        <BarChart
          data={selectedCompany}
          syncId="syncedData"
          width={800}
          height={330}
        >
          <CartesianGrid stroke="transparent" />
          <XAxis dataKey="stck_bsop_date" />
          <YAxis domain={[0, 3000]} />
          <Tooltip />
          <Bar
            dataKey={(data) => {
              const range = [data.stck_clpr, data.stck_oprc];
              return range;
            }}
            fill="#E94560"
          >
            {selectedCompany.map((data) => {
              return (
                <Cell fill={data.prdy_vrss_sign > 3 ? "#006DEE" : "#E94560"} />
              );
            })}
          </Bar>
        </BarChart>
        <BarChart
          data={selectedCompany}
          syncId="syncedData"
          width={800}
          height={180}
        >
          <CartesianGrid stroke="transparent" />
          <XAxis dataKey="stck_bsop_date" />
          <YAxis domain={[0, 3000]} />
          <Tooltip />
          <Bar dataKey={(e) => e.acml_vol} fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default Chart;
