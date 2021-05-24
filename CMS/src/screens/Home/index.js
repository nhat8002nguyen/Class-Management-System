import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import {View, TouchableOpacity, Image, Text, FlatList} from 'react-native';
import styles from './styles';
import {set} from 'react-native-reanimated';

const Box = ({data, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <Image source={data.image} style={styles.image} />
      <Text style={styles.title}>{data.title}</Text>
    </TouchableOpacity>
  );
};

export default function Home({navigation}) {
  const [userInfo, setUserInfo] = useState({});
  const {userSignin} = useSelector(state => state.userSignin);

  useEffect(() => {
    setUserInfo(userSignin ? userSignin.userInfo : {});
  }, [userSignin]);

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
        navigation.navigate('ListGroups');
        break;
      case 2:
        //TODO: Quiz
        navigation.navigate(
          userInfo.type === 1 ? 'QuizCreationNavigator' : 'DoingQuizNavigator',
        );
        break;
      case 3:
        //TODO: Bai tap
        navigation.navigate('CreateExercise');

        break;
      case 4:
        //TODO: Profile
        navigation.navigate('ProfileScreen');
        break;
    }
  };
  return (
    <View style={styles.container}>
      <Header isHome={true} title="Trang chủ" />
      <FlatList
        numColumns={2}
        data={list}
        renderItem={({item, index}) => (
          <Box data={item} key={index} onPress={() => onPress(index)} />
        )}
        contentContainerStyle={{alignItems: 'center', padding: 20}}
      />
    </View>
  );
}
