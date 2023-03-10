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

function Chart() {
  const [token, setToken] = useState("");
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    async function fetchStockData() {
      const kisToken = await axios.post("/oauth2/tokenP", {
        grant_type: "client_credentials",
        appkey: process.env.REACT_APP_APPKEY,
        appsecret: process.env.REACT_APP_APPSECRET,
      });
      setToken(kisToken.data.access_token);

      setInterval(async () => {
        const kisData = await axios.get(
          "/uapi/domestic-stock/v1/quotations/inquire-daily-price",
          {
            headers: {
              authorization: `Bearer ${kisToken.data.access_token}`,
              appkey: process.env.REACT_APP_APPKEY,
              appsecret: process.env.REACT_APP_APPSECRET,
              tr_id: "FHKST01010400",
            },
            params: {
              FID_COND_MRKT_DIV_CODE: "J",
              FID_INPUT_ISCD: "000660",
              FID_PERIOD_DIV_CODE: "D",
              FID_ORG_ADJ_PRC: "0000000000",
            },
          }
        );
        setStockData(kisData.data.output);
        console.log("5초 마다 실행");
      }, 5000); // 5초마다 데이터를 가져옴
    }
    fetchStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BarChart data={stockData} width={500} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stck_bsop_date" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey={(data) => {
            const range = [data.stck_hgpr, data.stck_lwpr];
            return range;
          }}
          fill="#E94560"
        >
          {stockData.map((data) => (
            <Cell fill={data.prdy_vrss_sign > 3 ? "#006DEE" : "#E94560"} />
          ))}
        </Bar>
        <Bar dataKey={(e) => e.acml_vol / 100} />
      </BarChart>
    </div>
  );
}

export default Chart;
