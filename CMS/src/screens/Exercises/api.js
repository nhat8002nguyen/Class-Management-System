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

//https://cms-backend-whatever.herokuapp.com/api/staff/classes/d92b8c7f-afee-4700-a350-4d9c5b288040/exercises
const getListExam = async (classId, type) => {
  try {
    console.log(type);
    let url = `${_URL}/staff/classes/${classId}/exercises`;
    if(type === 1){
      url += '?type=personal'
    }
    const {token, userInfo} = await getUserInfo();
    const headers = {
      headers: {
        token,
      },
    };
    const res = await axios.get(url, headers);
    return res;
  } catch (error) {
    console.log('Err@getListExam', error);
  }
};


//https://cms-backend-whatever.herokuapp.com/api/staff/exercises/c26112dd-d15c-4222-b248-1764fd9ca646/submissions

const getListSubmission = async (examId) => {
  try {
    let url = `${_URL}/staff/exercises/${examId}/submissions`;
    const {token, userInfo} = await getUserInfo();
    const headers = {
      headers: {
        token,
      },
    };
    console.log(url);
    const res = await axios.get(url, headers);
    return res;
  } catch (error) {
    console.log('Err@getListSubmission', error);
  }
};

const createExam = async (classId, data) => {
  try {
    const url = `${_URL}/staff/classes/${classId}/exercises`;
    console.log(url);
    const {token, userInfo} = await getUserInfo();
    const headers = {
      headers: {
        token,
      },
    };
    const res = await axios.post(url, data, headers);
    return res;
  } catch (error) {
    console.log('Err@getListExam', error);
  }
};
export default {
  getListExam,
  createExam,
  getListSubmission
};
