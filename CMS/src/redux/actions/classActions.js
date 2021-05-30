import axios from 'axios';
import {
  CLASS_LIST_FAIL,
  CLASS_LIST_REQUEST,
  CLASS_LIST_SUCCESS,
} from '../constants/classActionConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getUserInfo = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userSignin');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    return {};
  }
};

const listClass = () => async (dispatch, getState) => {
  dispatch({type: CLASS_LIST_REQUEST});
  const {token, userInfo} = await getUserInfo();
  try {
    // get date from api
    const url =
      userInfo.type === 1
        ? 'https://cms-backend-whatever.herokuapp.com/api/staff/classes'
        : 'https://cms-backend-whatever.herokuapp.com/api/classes';
    const {data} = await axios.get(url, {
      headers: {
        token: token,
      },
    });
    dispatch({type: CLASS_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: CLASS_LIST_FAIL, payload: error.message});
  }
};

const chooseCurrentClass = id => async dispatch => {
  dispatch({type: 'CURRENT_CLASS', payload: id});
};

export {listClass, chooseCurrentClass};
