import axios from 'axios';
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/userActionConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// store data to asyncstore to save signin status when reopening app.
const storeUserInfo = async userInfo => {
  try {
    const jsonValue = JSON.stringify(userInfo);
    await AsyncStorage.setItem('userInfo', jsonValue);
  } catch (err) {
    console.log(err);
  }
};

const signin = ({email, password}) => async (dispatch, getState) => {
  dispatch({type: USER_SIGNIN_REQUEST});
  try {
    const {data} = await axios.post(
      'https://cms-backend-whatever.herokuapp.com/auth/sign-in',
      {
        email,
        password,
      },
    );
    storeUserInfo({email: email, password: password, token: data});
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: {email: email, password: password, token: data},
    });
  } catch (err) {
    dispatch({type: USER_SIGNIN_FAIL, payload: err.message});
  }
};

const signup = ({email, password, type}) => async (dispatch, getState) => {
  dispatch({type: USER_SIGNUP_REQUEST});
  try {
    await axios.post(
      'https://cms-backend-whatever.herokuapp.com/auth/sign-up',
      {email, password, type},
    );
    dispatch({type: USER_SIGNUP_SUCCESS, payload: {email, password, type}});
  } catch (err) {
    dispatch({type: USER_SIGNUP_FAIL, payload: err.message});
  }
};

const logout = () => async (dispatch, getState) => {
  // clear AsyncStorage
  AsyncStorage.setItem('userInfo', '');
  dispatch({type: 'USER_LOGOUT'});
};

export {signin, signup, logout};
