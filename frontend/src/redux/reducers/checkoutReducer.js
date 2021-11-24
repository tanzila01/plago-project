import {
    ADD_TO_CHECKOUT,
    GET_CHECKOUT, 
    ACCEPT_ORDER
  } from "../constants/chekcoutConstants";
  
  const INITIAL_STATE = {
    checkout: [],
  };
  
  const checkoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_TO_CHECKOUT:
        //   console.log("chekckout red", action.payload)
        return {
            checkout: [...state.checkout, action.payload],
        };
        case GET_CHECKOUT:
              return {
                  ...state,
                checkout: action.payload
              }
        case ACCEPT_ORDER:
            return {
              checkout: action.payload,
            };
      default:
        return state;
    }
  };
  
  export default checkoutReducer;
  