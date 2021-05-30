import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {chooseCurrentClass} from '../../redux/actions/classActions';

const ClassCard = props => {
  const navigation = useNavigation();
  const {userSignin} = useSelector(state => state.userSignin);
  const [userInfo, setUserInfo] = useState({});
  const [isDialogVisible, setDialogVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserInfo(userSignin ? userSignin.userInfo : {});
  }, [userSignin]);

  const joinClass = () => {
    dispatch(chooseCurrentClass(props.id));
    navigation.navigate('Home');
  };

  return (
    <TouchableOpacity onPress={() => joinClass()}>
      <View style={styles.container}>
        <Text style={styles.className}>
          {props.name.length < 25
            ? props.name
            : props.name.substring(0, 25) + '...'}
        </Text>
        <Text style={styles.className}>{props.location}</Text>
        <Text style={styles.className}>{props.code}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'column',
    width: 323,
    height: 110,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  className: {
    fontWeight: '700',
    position: 'relative',
    left: 20,
    color: 'white',
    marginTop: 10,
  },
});

export default ClassCard;
