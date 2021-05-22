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
const storeUserInfo = async userSignin => {
  try {
    const jsonValue = JSON.stringify(userSignin);
    await AsyncStorage.setItem('userSignin', jsonValue);
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
    const storageData = {
      token: data.token,
      userInfo: {...data.userInfo, password},
    }
    storeUserInfo(storageData);
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({type: USER_SIGNIN_FAIL, payload: err.message});
  }
};

const signup = ({name, email, password, type}) => async (dispatch, getState) => {
  dispatch({type: USER_SIGNUP_REQUEST});
  try {
    await axios.post(
      'https://cms-backend-whatever.herokuapp.com/auth/sign-up',
      {name, email, password, type},
    );
    dispatch({type: USER_SIGNUP_SUCCESS, payload: {name, email, password, type}});
  } catch (err) {
    dispatch({type: USER_SIGNUP_FAIL, payload: err.message});
  }
};

const logout = () => async (dispatch, getState) => {
  // clear AsyncStorage
  AsyncStorage.setItem('userSignin', '');
  dispatch({type: 'USER_LOGOUT'});
};

export {signin, signup, logout};
