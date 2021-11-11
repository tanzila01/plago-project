
import {applyMiddleware , combineReducers , createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import laodingReducer from './reducers/loadingReducers';
import messageReducer from '../redux/reducers/messageReducers';
import categoryReducer from '../redux/reducers/categoryReducer';
import productReducer from '../redux/reducers/productReducers';
// import proLenghtReducer from "./reducers/loadingReducers"
import catProductReducer from '../redux/reducers/catProduct';

const reducer =  combineReducers({
  loading: laodingReducer,
  messages: messageReducer,
  categories: categoryReducer,
  products: productReducer,
  catProducts: catProductReducer,
})

const initialState  = {}
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store