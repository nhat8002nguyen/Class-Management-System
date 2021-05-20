import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/userActionConstants';

const userSigninReducer = (state = {userInfo: {}}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {loading: true, error: false};
    case USER_SIGNIN_SUCCESS:
      return {loading: false, userInfo: action.payload, success: true};
    case USER_SIGNIN_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

const userSignupReducer = (state = {userInfo: {}}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {loading: true, error: false};
    case USER_SIGNUP_SUCCESS:
      return {loading: false, userInfo: action.payload, success: true};
    case USER_SIGNUP_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export {userSigninReducer, userSignupReducer};
