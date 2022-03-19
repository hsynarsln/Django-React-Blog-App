import { combineReducers } from 'redux';
import blogReducer from './blogReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  blogs: blogReducer
});

export default rootReducer;
