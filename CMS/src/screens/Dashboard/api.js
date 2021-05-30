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

//https://cms-backend-whatever.herokuapp.com/api/classes/join?code=12345
const joinClass = async (code) => {
  try {
    let url = `${_URL}/classes/join?code=${code}`;
    const {token, userInfo} = await getUserInfo();
    const headers = {
      headers: {
        token,
      },
    };
    const res = await axios.post(url, {},  headers);
    return res;
  } catch (error) {
    console.log('Err@getListExam', error);
  }
};

export default {
  joinClass,
};
