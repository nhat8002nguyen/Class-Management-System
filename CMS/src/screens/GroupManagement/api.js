import axios from 'axios';
const _URL = 'https://cms-backend-whatever.herokuapp.com/api';
import AsyncStorage from '@react-native-async-storage/async-storage'
const getUserInfo = async ()=>{
  try {
    const jsonValue = await AsyncStorage.getItem('userSignin');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    return {};
  }
}
const createGroup = async (classId, name, password) => {
  try {
    //https://cms-backend-whatever.herokuapp.com/api/classes/d92b8c7f-afee-4700-a350-4d9c5b288040/groups?userID=d92b8c7f-afee-4700-a350-4d9c5b288041
    const url = `${_URL}/classes/${classId}/groups?`;
    const {token, userInfo} = await getUserInfo()
    const headers = {
      headers: {
        token
      }
    }
    const res = await axios.post(url, {name, password}, headers);
    return res;
  } catch (error) {
    console.log('Err@Create Group By Class Id: ', error);
  }
};
const getListGroupsByClassId = async (classId) => {
  // https://cms-backend-whatever.herokuapp.com/api/staff/classes/d92b8c7f-afee-4700-a350-4d9c5b288040/groups
  try {
    const url = `${_URL}/staff/classes/${classId}/groups`;
    const {token, userInfo} = await getUserInfo()
    const headers = {
      headers: {
        token
      }
    }
    const res = await axios.get(url, headers);
    return res;
  } catch (error) {
    console.log('Err@GetListGroups', error);
  }
};

const getListGroupsByUserId = async  (classId) => {
  try {
    //https://cms-backend-whatever.herokuapp.com/api/classes/d92b8c7f-afee-4700-a350-4d9c5b288040/groups
    const url = `${_URL}/classes/${classId}/groups`;
    const {token, userInfo} = await getUserInfo()
    const headers = {
      headers: {
        token
      }
    }
    const res = await axios.get(url, headers);
    return res;
  } catch (error) {
    console.log('Err@GetGroupsByUserID', error);
  }
};

const joinGroup = async (groupId, userId, password) =>{
  try {
    // /https://cms-backend-whatever.herokuapp.com/api/groups/383f3224-7a03-43d4-8e86-31197c497db8/members?userID=d92b8c7f-afee-4700-a350-4d9c5b288041&password=123
    const url = `${_URL}/groups/${groupId}/members?userID=${userId}&password=${password}`
    console.log(url);
    const res = await axios.post(url, {})
    return res;
  } catch (error) {
    console.log('Err@JoinGroup', error);
  }
}
export default {
  createGroup,
  getListGroupsByClassId,
  getListGroupsByUserId,
  joinGroup
};
