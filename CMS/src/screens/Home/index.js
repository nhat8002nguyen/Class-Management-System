import React from 'react';
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
        navigation.navigate('ListGroups')
        break;
      case 2:
        //TODO: Quiz
        break;
      case 3:
        //TODO: Bai tap
        navigation.navigate('CreateExercise')

        break;
      case 4:
        //TODO: Profile
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
