import React, { PureComponent } from "react";
import * as GraphsStyle from "./style";
import {
  ComposedChart,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default class Chart extends PureComponent {
  state = {
    data: [
      { name: "A회사", uv: 2100, pv: 800 },
      { name: "A회사", uv: 1800, pv: 1000 },
      { name: "A회사", uv: 1500, pv: 500 },
      { name: "A회사", uv: 1700, pv: 300 },
      { name: "A회사", uv: 1000, pv: 1200 },
      { name: "A회사", uv: 1500, pv: 800 },
    ],
  };

  dataUpdate() {
    setInterval(() => {
      let copyDataArr = [...this.state.data].splice(1); // state배껴와서 첫번째 인덱스 계속 짜르기
      this.setState({
        data: copyDataArr,
      }); // 짜른 카피 배열 state에 넣기

      console.log("copyDataArr : ", copyDataArr);
      console.log("state : ", this.state.data);

      let randomDefault = Math.floor(Math.random() * 1000); // 랜덤값 생성 0~999
      let randomTradingVolume = Math.floor(Math.random() * 200); // 랜덤값 생성 0~199
      let randomPlusMinus = ["+", "-"]; // 랜덤 부호
      let randomIndex = Math.floor(Math.random() * 2); // 랜덤 부호 인덱스 1 or 2

      let copyDataObj = { name: "A회사", uv: 2100, pv: 1000 }; // 배열에 계속 추가될 랜덤 객체 데이터

      // 밑으로는 랜덤 부호와 -값 제어
      if (randomPlusMinus[randomIndex] === "+") {
        copyDataObj.uv = copyDataObj.uv + randomDefault;
        copyDataObj.pv = copyDataObj.pv + randomTradingVolume;
        copyDataArr.push(copyDataObj);
        this.setState({
          data: copyDataArr,
        });
      } else {
        if (
          copyDataObj.uv < 0 ||
          copyDataObj.uv === 0 ||
          copyDataObj.pv < 0 ||
          copyDataObj.pv === 0
        ) {
          copyDataObj.uv = 0;
          copyDataObj.pv = 0;
          copyDataArr.push(copyDataObj);
        }
        if (copyDataObj.uv !== 0 && copyDataObj.pv !== 0) {
          copyDataObj.uv = copyDataObj.uv - randomDefault;
          copyDataObj.pv = copyDataObj.pv - randomTradingVolume;
          if (
            copyDataObj.uv < 0 ||
            copyDataObj.uv === 0 ||
            copyDataObj.pv < 0 ||
            copyDataObj.pv === 0
          ) {
            copyDataObj.uv = 0;
            copyDataObj.pv = 0;
            copyDataArr.push(copyDataObj);
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

  componentDidMount() {
    this.dataUpdate();
  }

  render() {
    return (
      <div>
        <GraphsStyle.Container>
          <ComposedChart
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
            <Bar dataKey="pv" fill="blue" />
            <Line type="monotone" dataKey="uv" stroke="magenta" />
          </ComposedChart>
        </GraphsStyle.Container>
      </div>
    );
  }
}
