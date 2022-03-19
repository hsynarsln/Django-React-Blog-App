import { CLEAR_ERRORS, GET_BLOGS_FAIL, GET_BLOGS_REQUEST, GET_BLOGS_SUCCESS, GET_MORE_BLOGS_FAIL, GET_MORE_BLOGS_REQUEST, GET_MORE_BLOGS_SUCCESS } from '../constants/blogConstants';

const initialState = {
  blogs: []
};

export const blogReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BLOGS_REQUEST:
      return {
        loading: true
      };
    case GET_MORE_BLOGS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        count: payload.count,
        next: payload.next,
        blogs: payload.results
      };
    case GET_MORE_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        next: payload.next,
        blogs: [...state.blogs, ...payload.results]
      };
    case GET_BLOGS_FAIL:
    case GET_MORE_BLOGS_FAIL:
      return {
        loading: false,
        blogs: null,
        error: payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default blogReducer;
