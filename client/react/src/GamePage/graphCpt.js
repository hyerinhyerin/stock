import axios from "axios";
import React, { useEffect, useState } from "react";
import btnImg from "../img/btn.png";
import upImg from "../img/up.png";
import downImg from "../img/down.png";
import { CSSTransition } from "react-transition-group";
import "./cssTransition.css";
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
  const [userInfo, setUserInfo] = useState(null);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [isDiv1Visible, setIsDiv1Visible] = useState(false);
  const [isDiv2Visible, setIsDiv2Visible] = useState(false);
  const [isDiv3Visible, setIsDiv3Visible] = useState(false);

  const formatter = new Intl.NumberFormat("en-US");

  useEffect(() => {
    const sessionAxios = async () => {
      const sessionData = await axios.get("/api/session");
      console.log("session 정보 : ", sessionData.data.sessionUser);
      setUserInfo(sessionData.data.sessionUser);
    };
    sessionAxios();
  }, []);

  useEffect(() => {
    const axiosData = async () => {
      const companys = await axios.get("/api/chart"); // 데베에서 여러개의 회사 정보 가져오기
      console.log("데베에서 받아온 초기 데이터 : ", companys.data.companys);

      // 데베에서 가져온 1차 회사데이터 차트에 쓸 양식에 맞게 변환 useEffect
      const newStockDataArr = companys.data.companys.map((company) => {
        const randomNum = backfun.startNum(); // 랜덤 숫자 생성
        const randomPM = backfun.startOp(); // 랜덤 부호 생성 +/-
        const stck_clpr = company.stockprice;
        let stck_oprc = 50000; // 종가
        let acml_vol = 50; // 거래량
        let prdy_vrss_sign = 0; // 음봉 양봉 기준
        if (randomPM === "+") {
          stck_oprc = stck_clpr + randomNum;
          acml_vol += randomNum;
          prdy_vrss_sign = 2;
        } else if (randomPM === "-" && stck_clpr > randomNum) {
          stck_oprc = Math.max(stck_clpr - randomNum, 0);
          acml_vol = Math.max(acml_vol - randomNum, 0);
          prdy_vrss_sign = 4;
        } else if (stck_clpr === 0) {
          stck_oprc = stck_clpr + randomNum;
          acml_vol += randomNum;
          prdy_vrss_sign = 2;
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

      setRealGroupedCompanies(groupedCompanies);

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
      // 거래량과 종가가 0 이하로 떨어지지 않도록 함
      newData.stck_oprc = Math.max(newData.stck_oprc - randomPr, 0);
      newData.acml_vol = Math.max(newData.acml_vol - randomPr, 0);
    } else if (newData.stck_oprc === 0) {
      newData.stck_bsop_date += 1;
      newData.prdy_vrss_sign = 2;
      newData.stck_clpr = newData.stck_oprc;
      newData.stck_oprc += randomPr;
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
    const intervalId = setInterval(updateCompanies, 18000);
    return () => clearInterval(intervalId);
  }, [updateCompanies]);

  const companiseBtnStyle = {
    width: "176px",
    height: "70px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderBottom: "1px solid white",
    fontSize: "20px",
    margin: "0px 10px",
  };

  const lisStyle = {
    borderTop: "1px solid white",
    borderBottom: "1px solid white",
    padding: "10px 10px",
    fontSize: "20px",
  };

  const upDownImg = {
    width: "20px",
    height: "20px",
    position: "relative",
    top: "3px",
  };

  const companiesSelectBtn = {
    background: "black",
    position: "relative",
    right: "4px",
    border: "1px solid white",
  };

  const graphCompanyName = {
    color: "white",
    position: "absolute",
    marginTop: "10px",
  };

  const divStyle = {
    display: "inline-block",
    border: "1px solid white",
    width: "1123px",
    height: "550px",
    marginTop: "29px",
    position: "absolute",
  };

  const hideCompanyBtn = {
    display: "inline-block",
    position: "relative",
    padding: "100px 61px",
    margin: 0,
    border: "1px solid white",
    zIndex: 1,
    width: "1000px",
    background: "black",
  };

  const graphDiv = {
    display: "inline-block",
    position: "absolute",
    top: "150px",
    width: "808px",
    margin: "0",
    borderRight: "1px dotted white",
  };

  const currentPrice = {
    display: "inline-block",
    color: "white",
    textAlign: "center",
    width: "305px",
    marginTop: 0,
  };

  const spanStyle = {
    display: "inline-block",
    fontSize: "36px",
    width: "100%",
    paddingTop: "15px",
    paddingBottom: "15px",
  };

  const ulStyle = {
    listStyleType: "none",
    padding: "0px",
    marginBottom: "0",
    marginTop: "0",
  };

  const overflowDiv = {
    display: "inline-block",
    height: "551px",
    marginTop: "0",
    position: "absolute",
    left: "845px",
    top: "150px",
    overflow: "auto",
  };

  const userInfoCurrentStock = {
    display: "inline-block",
    border: "1px solid white",
    width: "317px",
    height: "590px",
    marginLeft: "20px",
    marginTop: "0",
    position: "absolute",
    left: "1161px",
    top: "20px",
    color: "white",
  };

  const userInfoDiv = {
    fontSize: "20px",
    borderBottom: "1px solid white",
    paddingBottom: "30px",
  };

  const currentStock = {
    fontSize: "20px",
    textAlign: "center",
  };

  const buySellDiv = {
    display: "inline-block",
    position: "absolute",
    top: "617px",
    left: "1171px",
    width: "348px",
  };

  const sellPopup = {
    display: "inline-block",
    border: "1px solid white",
    textAlign: "center",
    backgroundColor: "black",
    width: "500px",
    height: "500px",
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1",
    fontSize: "23px",
  };

  const sellPopupInnerDiv = {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    left: "50%",
    transform: "translate(-50%)",
    marginTop: "0",
    width: "300px",
    height: "44px",
    border: "1px solid white",
    marginBottom: "30px",
  };

  const sellPopupPMBtn = {
    color: "white",
    backgroundColor: "black",
    border: "none",
    fontSize: "22px",
    width: "44px",
    height: "42px",
    cursor: "pointer",
  };

  const sellPopupInput = {
    border: "none",
    margin: "0 10px",
    width: "50%",
    height: "100%",
    textAlign: "center",
  };

  function companyBtnClick(companyName) {
    setSelectedCompanyName(companyName);
    setIsDiv2Visible(!isDiv2Visible);
    setCount(selectedCompany[29].stockCount);
    setPrice(selectedCompany[29].stck_oprc);
  }

  // 회사 이름을 추출하여 버튼 생성
  const buttons = realGroupedCompanies.map((company) => (
    <button
      style={companiseBtnStyle}
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
    }
  }, [selectedCompanyName, realGroupedCompanies]);

  // 매수, 매도창에 쓸 shares 주식 수와 price 가격 state관리
  useEffect(() => {
    setCount(selectedCompany[29].stockCount);
    setPrice(selectedCompany[29].stck_oprc);
  }, [selectedCompany]);

  const lis = realGroupedCompanies.map((company) => (
    <li style={lisStyle}>
      <span>
        {company[29].name} {company[29].stck_oprc}{" "}
      </span>
      <span>
        {company[29].prdy_vrss_sign > 3 ? (
          <span style={{ color: "#006DEE" }}>
            <img src={downImg} style={upDownImg}></img>
            {company[29].stck_clpr - company[29].stck_oprc}
          </span>
        ) : (
          <span style={{ color: "#E94560" }}>
            <img src={upImg} style={upDownImg}></img>
            {company[29].stck_oprc - company[29].stck_clpr}
          </span>
        )}
      </span>
    </li>
  ));

  const currentStockList = userInfo
    ? Object.entries(userInfo.havestock).map(([companyId, stockCount]) => {
        if (realGroupedCompanies[companyId]) {
          const company = realGroupedCompanies[companyId - 1][29];
          const { name, stck_oprc, stck_clpr } = company;
          const profit =
            stck_oprc > stck_clpr ? (
              <span style={{ color: "#E94560" }}>
                <img src={upImg} style={upDownImg}></img>
                {stck_oprc - stck_clpr}
              </span>
            ) : (
              <span style={{ color: "#006DEE" }}>
                <img src={downImg} style={upDownImg}></img>
                {stck_clpr - stck_oprc}
              </span>
            );

          return (
            <div key={companyId}>
              <span style={{ borderBottom: "1px solid white" }}>
                {name} {stockCount}주 {profit}
              </span>
            </div>
          );
        } else {
          return (
            <div key={companyId}>
              <span>해당 회사가 없습니다.</span>
            </div>
          );
        }
      })
    : [];

  const handleCountChange = (e) => {
    setCount(parseInt(e.target.value));
  };

  const handlePriceChange = (e) => {
    setPrice(parseInt(e.target.value));
  };

  const handleCountIncrement = (e) => {
    e.preventDefault();
    setCount(Math.min(count + 1, selectedCompany[29].stockCount));
  };

  const handleCountDecrement = (e) => {
    e.preventDefault();
    setCount(Math.max(count - 1, 0));
  };

  const handlePriceIncrement = (e) => {
    e.preventDefault();
    setPrice(Math.min(price + 100, selectedCompany[29].stck_oprc));
  };

  const handlePriceDecrement = (e) => {
    e.preventDefault();
    setPrice(Math.max(price - 100, 0));
  };

  const handleBuyBtn = () => {
    setIsDiv1Visible(!isDiv1Visible);
  };

  const handleSellBtn = () => {
    setIsDiv3Visible(!isDiv3Visible);
  };

  return (
    <div style={{ margin: "0" }}>
      <button onClick={handleButtonClick} style={companiesSelectBtn}>
        <img src={btnImg} style={{ width: "22px" }} />
      </button>
      <span style={graphCompanyName}>{selectedCompany[29].name}</span>
      <CSSTransition in={isDiv2Visible} classNames="slide" timeout={500}>
        <div style={divStyle}>
          {isDiv2Visible && <div style={hideCompanyBtn}>{buttons}</div>}
        </div>
      </CSSTransition>
      <div style={graphDiv}>
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
      <div style={overflowDiv}>
        <div style={currentPrice}>
          <span style={spanStyle}>현재시세</span>
          <ul style={ulStyle}>{lis}</ul>
        </div>
      </div>
      <div style={userInfoCurrentStock}>
        {userInfo ? (
          <div>
            <div style={userInfoDiv}>
              <div>
                <p style={{ textAlign: "center", color: "#546865" }}>내 정보</p>
                <span style={{ marginLeft: "20px", marginRight: "39px" }}>
                  닉네임{" "}
                </span>
                <span style={{ borderBottom: "1px solid white" }}>
                  {userInfo.usernickname}
                </span>
              </div>
              <div>
                <span style={{ marginLeft: "20px", marginRight: "20px" }}>
                  현재 자산
                </span>
                <span style={{ borderBottom: "1px solid white" }}>
                  {userInfo.money}
                </span>
              </div>
            </div>
            <div style={currentStock}>
              <p style={{ fontSize: "30px" }}>나의 현재 주식 현황</p>
              {currentStockList}
            </div>
          </div>
        ) : (
          <p>로딩중입니다...</p>
        )}
      </div>
      <div style={buySellDiv}>
        <from>
          <input
            style={{ display: "none" }}
            value={selectedCompany[29].name}
            name="company"
          />
          <button
            style={{
              backgroundColor: "black",
              border: "1px solid white",
              padding: "20px 51px",
              color: "white",
              fontSize: "25px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
            onClick={handleBuyBtn}
          >
            매수
          </button>
        </from>
        <from>
          <input
            style={{ display: "none" }}
            value={selectedCompany[29].name}
            name="graphCompanyName"
          />
          <button
            style={{
              backgroundColor: "black",
              border: "1px solid white",
              padding: "20px 51px",
              color: "white",
              fontSize: "25px",
              marginLeft: "10px",
            }}
            onClick={handleSellBtn}
          >
            매도
          </button>
        </from>
      </div>
      {isDiv1Visible && (
        <div style={sellPopup}>
          <form method="POST" action={`/buy/${userInfo.usernickname}`}>
            <p style={{ color: "white", marginTop: "40px" }}>지정가</p>
            <div style={sellPopupInnerDiv}>
              <button
                type="button"
                style={sellPopupPMBtn}
                onClick={handleCountDecrement}
              >
                -
              </button>
              <input
                type="text"
                name="stock"
                value={count + "주"}
                onChange={handleCountChange}
                style={sellPopupInput}
              />
              <button
                type="button"
                style={sellPopupPMBtn}
                onClick={handleCountIncrement}
              >
                +
              </button>
            </div>
            <div style={sellPopupInnerDiv}>
              <button
                type="button"
                style={sellPopupPMBtn}
                onClick={handlePriceDecrement}
              >
                -
              </button>
              <input
                type="text"
                name="price"
                value={formatter.format(price) + "원"}
                onChange={handlePriceChange}
                style={sellPopupInput}
                readOnly
              />
              <button
                type="button"
                style={sellPopupPMBtn}
                onClick={handlePriceIncrement}
              >
                +
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: "30px",
              }}
            >
              <span style={{ color: "white" }}>신용가능(예상)</span>
              <input
                type="text"
                value="0원"
                style={{
                  border: "none",
                  textAlign: "center",
                  fontSize: "25px",
                }}
                readOnly
              />
            </div>
            <div style={sellPopupInnerDiv}>
              <span style={{ color: "white", marginLeft: "10px" }}>
                주문금액
              </span>
              <input
                type="text"
                value={
                  formatter.format(parseInt(price) * parseInt(count)) + "원"
                }
                style={{ width: "150px", border: "none", textAlign: "center" }}
                readOnly
              />
            </div>
            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: "black",
                  border: "1px solid white",
                  padding: "20px 51px",
                  color: "white",
                  fontSize: "25px",
                  marginLeft: "10px",
                }}
              >
                매수
              </button>
            </div>
          </form>
        </div>
      )}
      {isDiv3Visible && (
        <div style={sellPopup}>
          <form method="POST" action={`/ 개sell/${userInfo.usernickname}`}>
            <p style={{ color: "white", marginTop: "40px" }}>지정가</p>
            <div style={sellPopupInnerDiv}>
              <button
                type="button"
                style={sellPopupPMBtn}
                onClick={handleCountDecrement}
              >
                -
              </button>
              <input
                type="text"
                name="stock"
                value={count + "주"}
                onChange={handleCountChange}
                style={sellPopupInput}
              />
              <button
                type="button"
                style={sellPopupPMBtn}
                onClick={handleCountIncrement}
              >
                +
              </button>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "black",
                  border: "1px solid white",
                  padding: "15px 30px",
                  color: "white",
                  fontSize: "15px",
                  marginBottom: "30px",
                }}
              >
                잔고
              </button>
            </div>
            <div style={sellPopupInnerDiv}>
              <button
                type="button"
                style={sellPopupPMBtn}
                onClick={handlePriceDecrement}
              >
                -
              </button>
              <input
                type="text"
                name="price"
                value={formatter.format(price) + "원"}
                onChange={handlePriceChange}
                style={sellPopupInput}
                readOnly
              />
              <button
                type="button"
                style={sellPopupPMBtn}
                onClick={handlePriceIncrement}
              >
                +
              </button>
            </div>
            <div style={sellPopupInnerDiv}>
              <span style={{ color: "white", marginLeft: "10px" }}>
                주문금액
              </span>
              <input
                type="text"
                value={
                  formatter.format(parseInt(price) * parseInt(count)) + "원"
                }
                style={{ width: "150px", border: "none", textAlign: "center" }}
                readOnly
              />
            </div>
            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: "black",
                  border: "1px solid white",
                  padding: "20px 51px",
                  color: "white",
                  fontSize: "25px",
                  marginLeft: "10px",
                }}
              >
                매도
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GraphCpt;
