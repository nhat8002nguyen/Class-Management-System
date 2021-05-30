import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from './api';
const Box = ({data, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <Image source={data.image} style={styles.image} />
      <Text style={styles.title}>{data.title}</Text>
    </TouchableOpacity>
  );
};

export default function Home({navigation, route}) {
  const [userInfo, setUserInfo] = useState({});
  const {userSignin} = useSelector(state => state.userSignin);
  const {classId} = useSelector(state => state.classId);
  const [checkIn, setCheckIn] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    setUserInfo(userSignin ? userSignin.userInfo : {});
  }, [userSignin]);
  useEffect(() => {
    getCheckIn();
  }, [isFocused]);
  const getCheckIn = async () => {
    const res = await api.getCheckIn(classId);
    if (res) {
      setCheckIn(res.data);
    }
  };
  const list = [
    {
      title: 'Nhóm',
      image: require('../../assets/images/class.png'),
    },
    {
      title: 'Quiz',
      image: require('../../assets/images/quiz.jpg'),
    },
    {
      title: 'Bài tập lớn',
      image: require('../../assets/images/exam.jpg'),
    },
  ];
  const onPress = index => {
    switch (index) {
      case 0:
        //TODO: Nhom
        navigation.navigate('ListGroups', {classId: null});
        break;
      case 1:
        //TODO: Quiz
        navigation.navigate(
          userInfo.type === 1 ? 'QuizCreationNavigator' : 'DoingQuizNavigator',
        );
        break;
      case 2:
        //TODO: Bai tap
        navigation.navigate('Exams', {classId: null});
        break;
    }
  };
  const onCheckIn = async () => {
    if (userInfo.type === 2) {
      //TODO: CHECK IN
      const res = await api.checkIn(classId, checkIn[0].id);
      if (res) {
        ToastAndroid.show('Điểm danh thành công', ToastAndroid.LONG);
      } else {
        ToastAndroid.show(
          'Điểm danh thất bại. Có thể đã hết giờ điểm danh. Vui lòng thử lại sau!',
          ToastAndroid.LONG,
        );
      }
    } else if (!checkIn.length) {
      //TODO: CREATE CHECKIN
      navigation.navigate('CreateCheckIn');
    } else {
      //TODO: VIEW LIST
      navigation.navigate('ListCheckedIn', checkIn[0])
    }
  };
  return (
    <View style={styles.container}>
      <Header isHome={false} title={route.params.name || ''} />
      {(checkIn.length && userInfo.type === 2) || userInfo.type === 1 ? (
        <TouchableOpacity onPress={onCheckIn} style={styles.checkin}>
          <MaterialCommunityIcons
            name="account-check"
            color="white"
            size={25}
          />
          <Text style={{color: 'white', marginLeft: 5, fontWeight: 'bold'}}>
            {userInfo.type === 2
              ? 'Điểm danh'
              : userInfo.type === 1 && !checkIn.length
              ? 'Tạo điểm danh'
              : 'Kiểm soát điểm danh'}
          </Text>
        </TouchableOpacity>
      ) : null}
      <FlatList
        keyExtractor={_ => _.title}
        data={list}
        renderItem={({item, index}) => (
          <Box data={item} key={index} onPress={() => onPress(index)} />
        )}
        contentContainerStyle={{alignItems: 'center', marginTop: 20}}
      />
    </View>
  );
}
