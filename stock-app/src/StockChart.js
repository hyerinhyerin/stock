import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default class Chart extends PureComponent {
  state = {
    data: [
      { name: "A회사", uv: 2100 },
      { name: "A회사", uv: 1800 },
      { name: "A회사", uv: 1500 },
      { name: "A회사", uv: 1700 },
      { name: "A회사", uv: 1000 },
      { name: "A회사", uv: 1500 },
    ],
  };

  dataUpdate() {
    setInterval(() => {
      let copyDataArr = [...this.state.data].splice(1); // state배껴와서 첫번째 인덱스 계속 짜르기
      this.setState({
        data: copyDataArr,
      }); // 짜른 카피 배열 state에 넣기

      let randomDefault = Math.floor(Math.random() * 1000); // 랜덤값 생성
      let randomPlusMinus = ["+", "-"]; // 랜덤 부호
      let randomIndex = Math.floor(Math.random() * 2); // 랜덤 부호 인덱스 1 or 2

      let copyDataObj = { name: "A회사", uv: 2100 }; // 배열에 계속 추가될 랜덤 객체 데이터

      // 밑으로는 랜덤 부호와 -값 제어
      if (randomPlusMinus[randomIndex] === "+") {
        copyDataObj.uv = copyDataObj.uv + randomDefault;
        copyDataArr.push(copyDataObj);
        this.setState({
          data: copyDataArr,
        });
      } else {
        if (copyDataObj.uv < 0 || copyDataObj.uv === 0) {
          copyDataObj.uv = 0;
          copyDataArr.push(copyDataObj);
        }
        if (copyDataObj.uv !== 0) {
          copyDataObj.uv = copyDataObj.uv - randomDefault;
          if (copyDataObj.uv < 0 || copyDataObj.uv === 0) {
            copyDataObj.uv = 0;
          }
          copyDataArr.push(copyDataObj);
        }
        this.setState({
          data: copyDataArr,
        });
      }
      console.log("uv : ", copyDataObj.uv);
    }, 2500);
  }

  render() {
    return (
      <div>
        <LineChart
          width={500}
          height={300}
          data={this.state.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>

        <button
          onClick={() => {
            this.dataUpdate();
          }}
        >
          업데이트
        </button>
      </div>
    );
  }
}
