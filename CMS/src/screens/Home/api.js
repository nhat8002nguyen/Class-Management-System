import axios from 'axios';
const _URL = 'https://cms-backend-whatever.herokuapp.com/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getUserInfo = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userSignin');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    return {};
  }
};

const getCheckIn = async id => {
  try {
    let url = `${_URL}/staff/classes/${id}/checkIns`;
    const {token, userInfo} = await getUserInfo();
    const headers = {
      headers: {
        token,
      },
    };
    const res = await axios.get(url, headers);
    return res;
  } catch (error) {
    console.log('Err@getCheckIn', error);
  }
};
const createCheckIn = async (id, data) => {
  try {
    let url = `${_URL}/staff/classes/${id}/checkIns`;
    const {token, userInfo} = await getUserInfo();
    const headers = {
      headers: {
        token,
      },
    };
    const res = await axios.post(url, data, headers);
    return res;
  } catch (error) {
    console.log('Err@createCheckIn', error);
  }
};
const checkIn = async (classId, checkInId) => {
  try {
    let url = `${_URL}/classes/${classId}/checkIns/${checkInId}`;
    const {token, userInfo} = await getUserInfo();
    const headers = {
      headers: {
        token,
      },
    };
    const res = await axios.post(url, {}, headers);
    return res;
  } catch (error) {
    console.log('Err@checkIn', error);
  }
};
const getListCheckedIn = async (classId, checkId) => {
  try {
    let url = `${_URL}/staff/classes/${classId}/checkIns/${checkId}/students`;
    console.log(url);
    const {token, userInfo} = await getUserInfo();
    const headers = {
      headers: {
        token,
      },
    };
    const res = await axios.get(url, headers);
    return res;
  } catch (error) {
    console.log('Err@getListCheckedIn', error);
  }
};
export default {
  getCheckIn,
  createCheckIn,
  checkIn,
  getListCheckedIn
};
