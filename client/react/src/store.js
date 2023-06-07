// store.js 파일
import { createStore } from "redux";

const initialState = {
  dataFromNewPanel: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA_FROM_NEWPANEL":
      return {
        ...state,
        dataFromNewPanel: action.payload, // B 컴포넌트로부터 받은 데이터 업데이트
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
