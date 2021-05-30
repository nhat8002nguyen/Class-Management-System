import axios from 'axios';
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
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
      'http://192.168.1.10:15000/auth/sign-in',
      {
        email,
        password,
      },
    );
    const storageData = {
      token: data.token,
      userInfo: {...data.userInfo, password},
    };
    storeUserInfo(storageData);
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: storageData,
    });
  } catch (err) {
    dispatch({type: USER_SIGNIN_FAIL, payload: err.message});
  }
};

const signup = ({name, email, password, type}) => async (
  dispatch,
  getState,
) => {
  dispatch({type: USER_SIGNUP_REQUEST});
  try {
    await axios.post(
      'http://192.168.1.10:15000/auth/sign-up',
      {name, email, password, type},
    );
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: {name, email, password, type},
    });
  } catch (err) {
    dispatch({type: USER_SIGNUP_FAIL, payload: err.message});
  }
};

const updateInfo = ({name, email, password}) => async (dispatch, getState) => {
  dispatch({type: USER_UPDATE_REQUEST});
  try {
    // update info
    dispatch({type: USER_UPDATE_SUCCESS, payload: data});
  } catch (err) {
    dispatch({type: USER_UPDATE_FAIL, payload: err.message});
  }
};

const logout = () => async (dispatch, getState) => {
  // clear AsyncStorage
  AsyncStorage.setItem('userSignin', '');
  dispatch({type: 'USER_LOGOUT'});
};

export {signin, signup, updateInfo, logout};