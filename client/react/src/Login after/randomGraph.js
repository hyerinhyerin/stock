import axios from "axios";
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

const backfun = require("../backFun/random");

const GraphCpt = () => {
  const [selectedCompany, setSelectedCompany] = useState(Array(30).fill({})); // 선택한 회사
  const [realGroupedCompanies, setRealGroupedCompanies] = useState([]); // 2차원 배열로 회사의 정보를 관리
  const [selectedCompanyName, setSelectedCompanyName] = useState(null); // 선택한 회사 이름을 담을 state 변수
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(0); // 선택한 회사의 인덱스

  useEffect(() => {
    const axiosData = async () => {
      const companys = await axios.get("/api/chart"); // 데베에서 여러개의 회사 정보 가져오기
      console.log("데베에서 받아온 초기 데이터 : ", companys.data.companys);

      // 데베에서 가져온 1차 회사데이터 차트에 쓸 양식에 맞게 변환 useEffect
      const newStockDataArr = companys.data.companys.map((company) => {
        const randomNum = backfun.startNum(); // 랜덤 숫자 생성(시가, 종가)
        let randomHigh = backfun.highLowNum(); // 랜덤 숫자 생성(고가, 저가)
        let randomLow = backfun.highLowNum(); // 랜덤 숫자 생성(고가, 저가)
        const randomPM = backfun.startOp(); // 랜덤 부호 생성 +/-
        const stck_clpr = company.stockprice;
        const startDate = new Date(2023, 0, 1); // 시작 날짜 (예: 2023년 1월 1일)
        const newIdx = 0;
        const bsopDate = new Date(
          startDate.getTime() + newIdx * 24 * 60 * 60 * 1000
        ); // stck_bsop_date를 계산하여 날짜 설정
        const formattedDate = `${
          bsopDate.getMonth() + 1
        }/${bsopDate.getDate()}`;
        let stck_oprc = 50000; // 종가
        let acml_vol = 50; // 거래량
        let prdy_vrss_sign = 0; // 음봉 양봉 기준

        if (randomHigh < randomLow) {
          let temp = randomHigh;
          randomHigh = randomLow;
          randomLow = temp;
        }
        while (randomHigh === randomLow) {
          randomHigh = backfun.highLowNum(); // 랜덤 숫자 생성(고가, 저가)
          randomLow = backfun.highLowNum(); // 랜덤 숫자 생성(고가, 저가)
          if (randomHigh < randomLow) {
            let temp = randomHigh;
            randomHigh = randomLow;
            randomLow = temp;
          }
        }

        if (randomPM === "+") {
          stck_oprc = stck_clpr + randomNum;
          randomHigh = stck_oprc + randomHigh;
          randomLow = stck_clpr - randomLow;
          acml_vol += randomNum;
          prdy_vrss_sign = 2;
        } else if (randomPM === "-" && stck_clpr > randomNum) {
          stck_oprc = Math.max(stck_clpr - randomNum, 0);
          randomHigh = stck_clpr + randomHigh;
          randomLow = stck_oprc - randomLow;
          acml_vol = Math.max(acml_vol - randomNum, 0);
          prdy_vrss_sign = 4;
        } else if (stck_clpr === 0) {
          stck_oprc = stck_clpr + randomNum;
          randomHigh = stck_oprc + randomHigh;
          randomLow = stck_clpr - randomLow;
          acml_vol += randomNum;
          prdy_vrss_sign = 2;
        }
        return {
          // 차트에 쓸 양식의 회사 데이터 객체
          name: company.companyname,
          stck_bsop_date: formattedDate, // 날짜를 "월/일" 형식으로 표현,
          prdy_vrss_sign,
          stck_oprc,
          stck_clpr,
          stck_high: randomHigh,
          stck_low: randomLow,
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

      setRealGroupedCompanies(groupedCompanies);

      // 처음 렌더링될 때 0~21 중 하나의 인덱스를 랜덤하게 선택
      const randomIdx = Math.floor(Math.random() * 22);
      // 선택한 회사 정보를 selectedCompany state에 업데이트
      setSelectedCompanyName(groupedCompanies[randomIdx][29].name);
      setSelectedCompanyIndex(randomIdx);
      // 초기에 랜덤한 인덱스로 회사 이름을 하나 저장해 초기 렌더링에 랜덤한 회사 데이터 차트에 표현
    };

    axiosData();
  }, []);

  // 새롭게 지속적으로 업데이트될 각 회사데이터 공정 과정 함수화1
  const createNewCompanyData = (prevData) => {
    const randomPr = backfun.startNum();
    const randomPM = backfun.startOp();
    const randomHigh = backfun.highLowNum(); // 랜덤 숫자 생성(고가, 저가)
    const randomLow = backfun.highLowNum(); // 랜덤 숫자 생성(고가, 저가)

    const bsopDate = new Date(prevData.stck_bsop_date);
    bsopDate.setDate(bsopDate.getDate() + 1); // 다음 날짜 계산
    const formattedDate = `${bsopDate.getMonth() + 1}/${bsopDate.getDate()}`;

    const newData = {
      ...prevData,
      stck_bsop_date: formattedDate,
    }; // 날짜를 "월/일" 형식으로 표현
    if (randomPM === "+") {
      newData.stck_bsop_date = formattedDate;
      newData.prdy_vrss_sign = 2;
      newData.stck_clpr = newData.stck_oprc;
      newData.stck_oprc += randomPr;
      newData.stck_high = newData.stck_oprc + randomHigh;
      newData.stck_low = newData.stck_clpr - randomLow;
      newData.acml_vol += randomPr;
    } else if (
      randomPM === "-" &&
      newData.stck_clpr > randomPr &&
      newData.stck_clpr > randomPr
    ) {
      newData.stck_bsop_date = formattedDate;
      newData.prdy_vrss_sign = 4;
      newData.stck_clpr = newData.stck_oprc;
      newData.stck_high = newData.stck_clpr + randomHigh;
      newData.stck_low = newData.stck_oprc - randomLow;
      // 거래량과 종가가 0 이하로 떨어지지 않도록 함
      newData.stck_oprc = Math.max(newData.stck_oprc - randomPr, 0);
      newData.acml_vol = Math.max(newData.acml_vol - randomPr, 0);
    } else if (newData.stck_oprc === 0) {
      newData.stck_bsop_date = formattedDate;
      newData.prdy_vrss_sign = 2;
      newData.stck_clpr = newData.stck_oprc;
      newData.stck_oprc += randomPr;
      newData.stck_high = newData.stck_oprc + randomHigh;
      newData.stck_low = newData.stck_clpr - randomLow;
      newData.acml_vol += randomPr;
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
        await axios.post("/api/curentdata", newCompanies).then((res) => {});
      };
      companyPriceUpdate();
      return newCompanies;
    });
  };

  // 새로운 데이터를 일정시간마다 realGroupedCompanies state에 추가
  useEffect(() => {
    const intervalId = setInterval(updateCompanies, 4000);
    return () => clearInterval(intervalId);
  }, [updateCompanies]);

  const graphDiv = {
    display: "inline-block",
    position: "absolute",
    top: "150px",
    left: "76px",
    width: "1000px",
    height: "641px",
    margin: "0",
    borderRight: "1px dotted white",
    background: "white",
  };

  //selectedCompanyName state 변수가 변경될 때마다 선택한 회사 정보를 추출하여 selectedCompany state 변수에 저장
  useEffect(() => {
    if (selectedCompanyName) {
      const company = realGroupedCompanies.find(
        (company) => company[29].name === selectedCompanyName
      );
      setSelectedCompany(company);
    }
  }, [selectedCompanyName, realGroupedCompanies]);

  return (
    <div style={{ margin: "0" }}>
      <div style={graphDiv}>
        <BarChart
          data={selectedCompany}
          syncId="syncedData"
          width={1000}
          height={380}
        >
          <CartesianGrid stroke="transparent" />
          <XAxis
            dataKey="stck_bsop_date"
            interval={0}
            tick={{ fontSize: 12 }}
          />
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
          {/* <Bar
            dataKey={(data) => {
              const range = [data.stck_high, data.stck_low];
              return range;
            }}
            fill="#E94560"
            barSize={20}
          >
            {selectedCompany.map((data) => {
              return (
                <Cell fill={data.prdy_vrss_sign > 3 ? "#006DEE" : "#E94560"} />
              );
            })}
          </Bar> */}
        </BarChart>

        <BarChart
          data={selectedCompany}
          syncId="syncedData"
          width={1000}
          height={230}
        >
          <CartesianGrid stroke="transparent" />
          <XAxis
            dataKey="stck_bsop_date"
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis domain={[0, 3000]} />
          <Tooltip />
          <Bar dataKey={(e) => e.acml_vol} fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default GraphCpt;
