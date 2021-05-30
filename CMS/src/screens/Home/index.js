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
  const {classId} = useSelector(state => state.classId);

  useEffect(() => {
    setUserInfo(userSignin ? userSignin.userInfo : {});
  }, [userSignin]);

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
  return (
    <View style={styles.container}>
      <Header isHome={true} title="Trang chủ" />
      <FlatList
        keyExtractor={_ => _.title}
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
