import {
    ADD_TO_CART,
    GET_CART, 
    EDIT_CART_INC
    } from "../constants/cartConstants";
    
    const INITIAL_STATE = {
      cart: [],
    }; 
    
    const cartReducer = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case ADD_TO_CART:
          console.log("cart in reducers", ...action.payload)
          return {
            ...state,
            cart: [...state.cart , action.payload]
        };
        case GET_CART:
              return {
                  ...state,
                cart: action.payload
              }
        // case EDIT_CART_INC:
        //   return {
        //     cart: action.payload,
        //   };
        default:
          return state;
      }
    };
    
    export default cartReducer;
    