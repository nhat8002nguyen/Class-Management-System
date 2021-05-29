import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import {View, TouchableOpacity, Image, Text, FlatList} from 'react-native';
import styles from './styles';

const Box = ({data, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <Image source={data.image} style={styles.image} />
      <Text style={styles.title}>{data.title}</Text>
    </TouchableOpacity>
  );
};

export default function Home({navigation}) {
  const [userType, setUserType] = useState(1);
  const {userSignin} = useSelector(state => state.userSignin);

  setTimeout(() => {
    if (userSignin?.userInfo) {
      setUserType(userSignin.userInfo.type);
    }
  }, 1000);

  console.log(userSignin);

  const list = [
    {
      title: 'Lớp học',
      image: require('../../assets/images/classroom.png'),
    },
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
    {
      title: 'Tài khoản',
      image: require('../../assets/images/profile.png'),
    },
  ];
  const onPress = index => {
    switch (index) {
      case 0:
        //TODO: Quan ly lop hoc
        break;
      case 1:
        //TODO: Nhom
        navigation.navigate('ListGroups', {classId: null});
        break;
      case 2:
        //TODO: Quiz
        navigation.navigate(userType === 1 ? "QuizCreationNavigator" :'DoingQuizNavigator' );
        break;
      case 3:
        //TODO: Bai tap
        navigation.navigate('Exams', {classId: null});

        break;
      case 4:
        //TODO: Profile
        navigation.navigate('ProfileScreen')
        break;
    }
  };
  return (
    <View style={styles.container}>
      <Header isHome={true} title="Trang chủ" />
      <FlatList
        keyExtractor = {(_)=> _.title}
        numColumns={2}
        data={list}
        renderItem={({item, index}) => (
          <Box data={item} key={index} onPress={() => onPress(index)} />
        )}
        contentContainerStyle={{alignItems: 'center', marginTop: 20}}
      />
    </View>
  );
}
