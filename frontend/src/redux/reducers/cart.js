import {findIndex, propEq, indexOf, clone, remove, update} from 'ramda'
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
          return {
            ...state,
            cart: [...state.cart , action.payload]
        };
        case GET_CART:
              return {
                  ...state,
                cart: action.payload
              }
          case EDIT_CART_INC:
          // console.log("cart in reducers", ...action.payload)
          const index = findIndex(propEq("_id", action.payload._id))(state.cart)
          console.log("index in red", index)
        const newQ = action.payload.quantity + 1
        const newPrice = action.payload.price + action.payload.price/action.payload.quantity
        console.log("new quant in red", newQ)
        const newDat = {
            ...action.payload,
            quantity: newQ,
            price: newPrice
        }
        console.log("newDAt in reducer", newDat)
        const newData = update(index, newDat, state.cart )
        console.log("newData in red", newData)
    //     setData(newData)
          return {
            ...state,
            cart: newData,
          };
        default:
          return state;
      }
    };
    
    export default cartReducer;
    