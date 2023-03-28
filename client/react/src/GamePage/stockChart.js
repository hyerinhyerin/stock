import React, { useEffect, useState, useCallback } from "react";
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

const backfun = require("../backFun/random");

function Chart() {
  const [stockCompanies, setStockCompanies] = useState([]); // 데베에서 꺼내온 회사 정보
  const [stockDataArr, setStockDataArr] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]); // 차트에서 사용할 회사

  useEffect(() => {
    const axiosData = async () => {
      const companys = await axios.get("/api/chart"); // 데베에서 여러개의 회사 정보 가져오기
      setStockCompanies(companys.data.companys);
    };
    if (stockCompanies.length === 0) {
      axiosData();
    }
  }, []);

  let [randomIdx, setRandomIdx] = useState(Math.floor(Math.random() * 22)); // 0-21 랜덤 생성

  useEffect(() => {
    const newData = async () => {
      let randomNum = backfun.startNum(); // 랜덤 숫자 생성
      let randomPM = backfun.startOp(); // 랜덤 부호 생성 + -

      console.log("첫 렌더링 : ", randomIdx);

      if (stockCompanies.length > 0) {
        let randomCompany = {
          name: stockCompanies[randomIdx].companyname,
          stck_bsop_date: 1,
          prdy_vrss_sign: 0,
          stck_oprc: 50000,
          stck_clpr: stockCompanies[randomIdx].stockprice,
          acml_vol: 50,
          stockCount: stockCompanies[randomIdx].companystock,
        };
        console.log("randomNum : ", randomNum, randomPM);

        if (randomPM === "+") {
          // 가져온 회사 데이터에서 시가만 정하고 종가는 랜덤으로 제어
          randomCompany.stck_oprc = randomCompany.stck_clpr + randomNum;
          randomCompany.acml_vol += randomNum;
          randomCompany.prdy_vrss_sign = 2;
        } else if (randomPM === "-" && randomCompany.stck_oprc > randomNum) {
          randomCompany.stck_oprc = randomCompany.stck_clpr - randomNum;
          randomCompany.acml_vol -= randomNum;
          randomCompany.prdy_vrss_sign = 4;
          randomCompany.acml_vol = Math.max(randomCompany.acml_vol, 0);
        }
        console.log("randomCompany생성 : ", randomCompany);
        setStockDataArr((prevArr) => {
          const newStockDataArr = [...prevArr, randomCompany];
          return newStockDataArr;
        });
      }
    };
    newData();
  }, [stockCompanies]);

  useEffect(() => {
    let lastItem = stockDataArr.slice(-1)[0];
    // 마지막 값 가져와서 새로운 데이터 계산에 활용
    const interval = setInterval(() => {
      if (lastItem.stck_bsop_date !== 5) {
        if (stockDataArr.length === 30) {
          const newStockDataArr = [...stockDataArr].slice(1);
          setStockDataArr(newStockDataArr);
        }

        let randomPr = backfun.startNum(); // 랜덤 숫자 생성
        let randomPM = backfun.startOp(); // 랜덤 부호 생성 + -
        let randomAcml = backfun.startNum(); // 거래량 나중에는 받아오자

        console.log("stockDataArr : ", stockDataArr);

        if (lastItem.stck_bsop_date === 5) {
          clearInterval(interval); // 1년 되면 종료
        }

        console.log("last : ", lastItem);

        let newStockObj = {
          name: lastItem.name,
          stck_bsop_date: lastItem.stck_bsop_date + 1,
          prdy_vrss_sign: 0,
          stck_oprc: lastItem.stck_oprc,
          stck_clpr: lastItem.stck_oprc,
          acml_vol: lastItem.acml_vol,
          stockCount: lastItem.stockCount,
        };
        console.log("newStockObj생성 : ", newStockObj);

        if (randomPM === "+") {
          newStockObj.stck_oprc += randomPr;
          newStockObj.acml_vol += randomAcml;
          newStockObj.prdy_vrss_sign = 2;
        } else if (randomPM === "-" && newStockObj.stck_oprc > randomPr) {
          newStockObj.stck_oprc -= randomPr;
          newStockObj.acml_vol -= randomAcml;
          newStockObj.prdy_vrss_sign = 4;
          // 거래량이 0 이하로 떨어지지 않도록 함
          newStockObj.acml_vol = Math.max(newStockObj.acml_vol, 0);
        }
        // if(stockDataArr[stockDataArr.length - 1].stck_bsop_date ===  )
        setStockDataArr((prevState) => [...prevState.slice(1), newStockObj]);
      }
    }, 18000);
    return () => clearInterval(interval);
  }, [stockDataArr]);

  return (
    <div>
      <BarChart
        data={stockDataArr}
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
          {stockDataArr.map((data) => (
            <Cell fill={data.prdy_vrss_sign > 3 ? "#006DEE" : "#E94560"} />
          ))}
        </Bar>
      </BarChart>
      <BarChart
        data={stockDataArr}
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
  );
}

export default Chart;
