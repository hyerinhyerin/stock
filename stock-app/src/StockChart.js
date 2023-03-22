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

const backfun = require("./random");

function Chart() {
  const [stockDataArr, setStockDataArr] = useState([
    {
      name: "handae",
      stck_bsop_date: 0,
      prdy_vrss_sign: 0,
      stck_oprc: 52000, // 종가
      stck_clpr: 50000, // 시가
      acml_vol: 3000,
    },
  ]);
  // 배열을 처음부터 30개로 하고 싶으면 데이터를 채워 놓던가
  // 첨에 데이터를 비워두고는 예쁜 상태로 불가능하다

  useEffect(() => {
    const interval = setInterval(() => {
      if (stockDataArr.length === 365) {
        clearInterval(interval); // 1년 되면 종료
      }

      if (stockDataArr.length === 30) {
        const newStockDataArr = [...stockDataArr].slice(1);
        setStockDataArr(newStockDataArr);
      }

      let randomPr = backfun.startNum(); // 랜덤 숫자 생성
      let randomPM = backfun.startOp(); // 랜덤 부호 생성 + -
      let randomAcml = backfun.startNum(); // 거래량 나중에는 받아오자

      let lastItem = stockDataArr.slice(-1)[0];
      // 마지막 값 가져와서 새로운 데이터 계산에 활용

      let newStockObj = {
        name: "handae",
        stck_bsop_date: lastItem.stck_bsop_date + 1,
        prdy_vrss_sign: 0,
        stck_oprc: lastItem.stck_oprc,
        stck_clpr: lastItem.stck_oprc,
        acml_vol: lastItem.acml_vol,
      };

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

      setStockDataArr((prevState) => [...prevState, newStockObj]);
      console.log("stockDataArr : ", stockDataArr);
    }, 3000);
    return () => clearInterval(interval);
  }, [stockDataArr]);

  return (
    <div>
      <BarChart data={stockDataArr} width={800} height={500}>
        <CartesianGrid strokeDasharray="3 3" />
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
        <Bar dataKey={(e) => e.acml_vol} />
      </BarChart>
    </div>
  );
}

export default Chart;
