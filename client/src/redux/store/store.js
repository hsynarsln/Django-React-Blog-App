import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

let store;
// let initialState = {
//   cart: {
//     cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
//     shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
//   }
// };

if (process.env.NODE_ENV === 'development') {
  store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
} else {
  store = createStore(rootReducer, applyMiddleware(thunk));
}

store.subscribe(() => {
  // console.log(store.getState());
});

export default store;
