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
const createClass = async ( data) => {
  try {
    let url = `${_URL}/staff/classes`;
    const {token, userInfo} = await getUserInfo();
    const headers = {
      headers: {
        token,
      },
    };
    const res = await axios.post(url, data,  headers);
    return res;
  } catch (error) {
    console.log('Err@getListExam', error);
  }
};

export default {
  createClass,
};
