import {START_LOADING , STOP_LOADING} from '../constants/loadingConstants';
import {SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from '../constants/messageConstants';
import axios from 'axios'
import {ADD_TO_CHECKOUT, GET_CHECKOUT} from '../constants/chekcoutConstants'


// export const addCheckout = (data) => async dispatch => {
//     try{
//         dispatch({type: START_LOADING})
//         const config ={
//           headers:{
//               'Content-Type': "application/json"
//           }
//       }
//       const response = await axios.post('/api/checkout' , data , config)
//       dispatch({type: STOP_LOADING})
//       console.log("response in checkout actions", response.data.newCheckout)
//       dispatch({type: ADD_TO_CHECKOUT , payload: response.data.newCheckout})

//     }catch(e){
//      console.log("Error while fetching data" , e);
//      dispatch({type: STOP_LOADING})
//      dispatch({type: SHOW_ERROR_MESSAGE , payload: "error"})
//     }
// }

export const addCheckout = data => async dispatch => {
    try{
        dispatch({type: START_LOADING})
        const config ={
          headers:{
              'Content-Type': "application/json"
          }
      }
      const response = await axios.post('/api/checkout' , data , config)
      dispatch({type: STOP_LOADING})
     dispatch({type: SHOW_SUCCESS_MESSAGE , payload: response.data.successMessage})
     dispatch({type: ADD_TO_CHECKOUT , payload: response.data.newCheckout})
    }catch(e){
     console.log("Error while fetching checkout data" , e);
     dispatch({type: STOP_LOADING})
     dispatch({type: SHOW_ERROR_MESSAGE , payload: "error"})
    }
  }
  
  export const getAllCheckout = () => async dispatch => {
    try{
        dispatch({type: START_LOADING})
      const response = await axios.get('/api/checkout')
      dispatch({type: STOP_LOADING})
      console.log("resp in check actions", response.data.checkout)
      dispatch({type: GET_CHECKOUT , payload: response.data.checkout})
    }catch(e){
     console.log("Error while fetching cart data" , e);
     dispatch({type: STOP_LOADING})
     dispatch({type: SHOW_ERROR_MESSAGE , payload: e.response})
    }
  }