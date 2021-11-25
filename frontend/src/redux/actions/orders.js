import {START_LOADING , STOP_LOADING} from '../constants/loadingConstants';
import {SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from '../constants/messageConstants';
import axios from 'axios'
import { GET_ACCEPTED, GET_DECLINED} from '../constants/chekcoutConstants'
  
  export const getAccepted = () => async dispatch => {
    try{
        dispatch({type: START_LOADING})
      const response = await axios.get('/api/orders')
      dispatch({type: STOP_LOADING})
      console.log("resp in actions", response.data.checkout)
      dispatch({type: GET_ACCEPTED , payload: response.data.checkout})
    }catch(e){
     console.log("Error while fetching orders data" , e);
     dispatch({type: STOP_LOADING})
     dispatch({type: SHOW_ERROR_MESSAGE , payload: e.response})
    }
  }

  export const getDeclined = (id) => async dispatch => {
    try{
        dispatch({type: START_LOADING})
      const response = await axios.get(`/api/orders/${id}`)
      dispatch({type: STOP_LOADING})
      console.log("resp in check actions", response.data.checkout)
      dispatch({type: GET_DECLINED , payload: response.data.checkout})
    }catch(e){
     console.log("Error while fetching orders data" , e);
     dispatch({type: STOP_LOADING})
     dispatch({type: SHOW_ERROR_MESSAGE , payload: e.response})
    }
  }

//   export const acceptOrder = (id, product) => async dispatch => {
//    console.log("info in acions", id, product)
//     try{
//       dispatch({type: START_LOADING})
//       const response = await axios.put( , product)
//     dispatch({type: STOP_LOADING})
//     console.log("payload in actios", response.data)
//     // dispatch({type: ACCEPT_ORDER , payload: response.data.cartId})
  
//     }catch(err){
//         console.log("Error while updating cart" , err);
//         dispatch({type: STOP_LOADING})
//         // dispatch({type: SHOW_ERROR_MESSAGE , payload: err.response.data.errorMessage})
//     }
  
//   }
