import {
    GET_ACCEPTED,
    GET_DECLINED
  } from "../constants/chekcoutConstants";
  
  const INITIAL_STATE = {
    declinedOrders: [],
  };
  
  const declinedOrdersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_DECLINED:
            console.log("reducer apylaod", action.payload)
        return {
            declinedOrders: [...state.declinedOrders, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default declinedOrdersReducer;
  