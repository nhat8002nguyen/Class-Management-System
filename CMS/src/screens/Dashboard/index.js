

import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ClassCard from '../../components/molecules/ClassCard';
import styles from './styles';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {listClass} from '../../redux/actions/classActions';
import Searching from '../../components/Searching'
import NoData from '../../components/NoData'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useIsFocused} from '@react-navigation/native'
import Header from '../../components/Header'
import ModalJoinGroup from '../GroupManagement/ListGroups/ModalJoinGroup'
import api from './api';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Dashboard = ({navigation}) => {
  const {classList} = useSelector(state => state);
  const {loading, classes, error} = classList;
  const {userSignin} = useSelector(state => state.userSignin); 
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused()
  const [modalJoin, setModalJoin] = useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(listClass());
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(listClass());
  }, [isFocused]);
  const _onPress = () => {
    if(userSignin?.userInfo?.type === 1){
      //TODO: create class
      navigation.navigate('CreateClass')
    }else{
      //TODO: join class
      setModalJoin(true)
    }
  }
  const onJoin= async(code)=>{
    try {
      const res = await api.joinClass(code)
      if(res){
        ToastAndroid.show('Thành công!', ToastAndroid.LONG)
        dispatch(listClass());
        setModalJoin(false)
      }else{
        ToastAndroid.show('Đã xảy ra sự cố!', ToastAndroid.LONG)
      }
    } catch (error) {
      ToastAndroid.show('Đã xảy ra sự cố!', ToastAndroid.LONG)
    }
  }
  return (
    <View style={styles.container}>
      <Header title = 'Danh sách lớp học' isHome = {true}/>
      <TouchableOpacity onPress = {_onPress} style = {styles.addBtn}>
        <MaterialCommunityIcons name = {userSignin?.userInfo?.type === 1? 'plus': 'account-arrow-right'} size = {35} color = 'white'/>
      </TouchableOpacity>
      {loading ? (
        <Searching/>
      ) : !classes.length ? (
        <NoData title= {userSignin?.userInfo?.type=== 1? 'Không tìm thấy lớp nào, vui lòng tạo lớp và thử lại!': 'Bạn chưa tham gia lớp nào, vui lòng tham gia và thử lại!'} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.listQuiz}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {classes.map(aClass => (
            <ClassCard key={aClass.id} {...aClass} navigation={navigation} />
          ))}
        </ScrollView>
      )}
      <ModalJoinGroup visible = {modalJoin} onClose = {()=> setModalJoin(false)} _onConfirm = {onJoin}/>
    </View>
  );
};

export default Dashboard;
