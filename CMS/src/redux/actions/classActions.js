import axios from 'axios';
import {
  CLASS_LIST_FAIL,
  CLASS_LIST_REQUEST,
  CLASS_LIST_SUCCESS,
} from '../constants/classActionConstants';

const listClass = () => async (dispatch, getState) => {
  dispatch({type: CLASS_LIST_REQUEST});
  const {
    userSignin: {
      userSignin: {token, userInfo},
    },
  } = getState();
  try {
    // get date from api
    const url =
      userInfo.type === 1
        ? 'http://192.168.1.10:15000/api/staff/classes'
        : 'http://192.168.1.10:15000/api/classes';
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
