import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {chooseCurrentClass} from '../../redux/actions/classActions';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

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
    navigation.navigate('Home', {name: props.name});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => joinClass()}>
      <Text style={styles.className}>{props.name}</Text>
      <View style={styles.row}>
        <Text>Phòng học: </Text>
        <Text style={styles.code}>{props.location}</Text>
      </View>
      <View style={styles.row}>
        <Text>ID lớp</Text>
        <Text style={styles.code}>{props.code}</Text>
      </View>
      <View style={styles.row}>
        <Text>Số lượng SV tối đa</Text>
        <Text style={styles.code}>{props.maxGroupMembers}</Text>
      </View>
      <View style={styles.row}>
        <Text>Thời gian học</Text>
        <Text style={styles.code}>
          {props.startTime || ''} - {props.endTime || ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '95%',
    height: 110,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'center',
    shadowOpacity: 0.9,
    shadowOffset: {height: 13, width: 55},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 6,
    shadowRadius: 15,
    marginBottom: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    color: 'black',
    marginLeft: 50,
  },
  code: {
    color: 'black',
    fontWeight: 'bold',
  },
  className: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
});

export default ClassCard;
