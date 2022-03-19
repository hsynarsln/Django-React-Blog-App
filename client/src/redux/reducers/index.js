import { combineReducers } from 'redux';
import addCommentReducer, { blogDetailReducer, blogsReducer } from './blogReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  blogs: blogsReducer,
  blogDetail: blogDetailReducer,
  comment: addCommentReducer
});

export default rootReducer;
