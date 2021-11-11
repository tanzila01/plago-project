

import {GET_CATEGORIES , CREATE_CATEGORIES,  DELETE_CATEGORIES} from '../constants/categoryConstants';



const INITIAL_STATE = {
    categories: []
}

const categoryReducer = (state = INITIAL_STATE , action) =>{
     switch(action.type){
         case GET_CATEGORIES:
              return {
                  ...state,
                categories: action.payload
              }
              case CREATE_CATEGORIES:
              return {
                  ...state,
                categories: [...state.categories , action.payload]
              }
              case DELETE_CATEGORIES:
                return {
                  categories: state.categories.filter((p) => p._id !== action.payload._id),
                };
         default:
             return state
     }
}

export default categoryReducer