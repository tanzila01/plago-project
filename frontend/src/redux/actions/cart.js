import {addToCart} from '../../api/cart'
import {START_LOADING , STOP_LOADING} from '../constants/loadingConstants';
import {SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from '../constants/messageConstants';
import axios from 'axios'
import {GET_CART, EDIT_CART_INC} from '../constants/cartConstants'

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

export const getAllCart = () => async dispatch => {
    try{
        dispatch({type: START_LOADING})
      const response = await axios.get('/api/cart')
      dispatch({type: STOP_LOADING})
      dispatch({type: GET_CART , payload: response.data.cart})
    }catch(e){
     console.log("Error while fetching cart data" , e);
     dispatch({type: STOP_LOADING})
     dispatch({type: SHOW_ERROR_MESSAGE , payload: e.response.data.errorMessage})
    }
  }

  export const editCartInc = id => async dispatch => {

    try{
      dispatch({type: START_LOADING})
      const response = await axios.put('/api/cart', id)
    dispatch({type: STOP_LOADING})
    console.log("payload in actios", response.data.cartId)
    dispatch({type: EDIT_CART_INC , payload: response.data.cartId})
  
    }catch(err){
        console.log("Error while updating cart" , err);
        dispatch({type: STOP_LOADING})
        // dispatch({type: SHOW_ERROR_MESSAGE , payload: err.response.data.errorMessage})
    }
  
  }