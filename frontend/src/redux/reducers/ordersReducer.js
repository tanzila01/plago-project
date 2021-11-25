import {
    GET_ACCEPTED,
    GET_DECLINED
  } from "../constants/chekcoutConstants";
  
  const INITIAL_STATE = {
    orders: [],
  };
  
  const ordersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_ACCEPTED:
          console.log("reducer apylaod", action.payload)
        return {
            orders: [...state.orders, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default ordersReducer;
  