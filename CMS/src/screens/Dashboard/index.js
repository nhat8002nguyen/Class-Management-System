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

export default function Dashboard({navigation}) {
  const [userInfo, setUserInfo] = useState({});
  const {userSignin} = useSelector(state => state.userSignin);

  useEffect(() => {
    setUserInfo(userSignin ? userSignin.userInfo : {});
  }, [userSignin]);

  const list = [
    {
      title: 'Lớp học',
      image: require('../../assets/images/classroom.png'),
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
        navigation.navigate(
          userInfo.type === 1 ? 'ClassListScreen' : 'StudentClassScreen',
        );
        break;
      case 1:
        //TODO: Profile
        navigation.navigate('ProfileScreen');
        break;
    }
  };
  return (
    <View style={styles.container}>
      <Header isHome={true} title="Dashboard" />
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
