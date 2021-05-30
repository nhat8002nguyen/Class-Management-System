import axios from 'axios';
const _URL = 'http://192.168.1.10:15000/api';
import AsyncStorage from '@react-native-async-storage/async-storage'
const getUserInfo = async ()=>{
  try {
    const jsonValue = await AsyncStorage.getItem('userSignin');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    return {};
  }
}
const createGroup = async (classId, data) => {
  try {
    //http://192.168.1.10:15000/api/classes/d92b8c7f-afee-4700-a350-4d9c5b288040/groups?userID=d92b8c7f-afee-4700-a350-4d9c5b288041
    const url = `${_URL}/classes/${classId}/groups`;
    const {token, userInfo} = await getUserInfo()
    const headers = {
      headers: {
        token
      }
    }
    const res = await axios.post(url, data, headers);
    return res;
  } catch (error) {
    console.log('Err@Create Group By Class Id: ', error);
  }
};
const getListGroupsByClassId = async (classId) => {
  // http://192.168.1.10:15000/api/staff/classes/d92b8c7f-afee-4700-a350-4d9c5b288040/groups
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
    //http://192.168.1.10:15000/api/classes/d92b8c7f-afee-4700-a350-4d9c5b288040/groups
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

const joinGroup = async (groupId, password) =>{
  try {
    // /http://192.168.1.10:15000/api/groups/383f3224-7a03-43d4-8e86-31197c497db8/members?userID=d92b8c7f-afee-4700-a350-4d9c5b288041&password=123
    const url = `${_URL}/groups/${groupId}/members?password=${password}`
    const {token, userInfo} = await getUserInfo()
    const headers = {
      headers: {
        token
      }
    }
    console.log(url);
    const res = await axios.post(url, {}, headers)
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
