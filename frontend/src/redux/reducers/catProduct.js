import {
  GET_CATPRODUCT
  } from "../constants/catProductConstants";
  
  const INITIAL_STATE = {
    catProducts: [],
  }; 
  
  const catProductReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_CATPRODUCT:
        console.log("prodcats in reducres", ...action.payload)
        return {
          catProducts: [...action.payload],
        };
      default:
        return state;
    }
  };
  
  export default catProductReducer;
  