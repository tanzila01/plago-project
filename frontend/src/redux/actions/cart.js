import {addToCart} from '../../api/cart'
import {START_LOADING , STOP_LOADING} from '../constants/loadingConstants';
import {SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from '../constants/messageConstants';
import axios from 'axios'

export const addCart = (data) => async dispatch => {
    try{
        dispatch({type: START_LOADING})
        const config ={
          headers:{
              'Content-Type': "application/json"
          }
      }
      const response = await axios.post('/api/cart' , data , config)
      console.log("response in cart actions", response.data.newCart)
      dispatch({type: STOP_LOADING})
     dispatch({type: SHOW_SUCCESS_MESSAGE , payload: response.data.successMessage})
    }catch(e){
     console.log("Error while fetching data" , e);
     dispatch({type: STOP_LOADING})
     dispatch({type: SHOW_ERROR_MESSAGE , payload: "error"})
    }
}