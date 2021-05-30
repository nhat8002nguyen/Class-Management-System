import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NoData from '../../../components/NoData';
import Searching from '../../../components/Searching';
import Header from '../../../components/Header';
import api from '../api';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';

const SubmitItem = ({item, endTime, navigation}) => {
  return (
    <TouchableOpacity style={styles.item} onPress ={()=> navigation.navigate('GradeStudent', item)}>
      <Text>Sinh viên: {item.userEmail}</Text>
      <Text>
        Thời gian nộp: {moment(item.submitTime).format('DD/MM/YYYY HH:mm')}
        <Text style={{color: 'red', fontWeight: 'bold'}}>
          {moment(item.submitTime) > moment(endTime) ? '  Trễ hạn' : ''}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

export default Grade = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listSubmissions, setListSubmission] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);
  const renderItem = ({item, indx}) => {
    return <SubmitItem item={item} endTime={route.params.endTime} navigation ={navigation}/>;
  };
  const getData = async () => {
    try {
      const res = await api.getListSubmission(route.params.id);
      setListSubmission(res.data);
    } catch (error) {
      setListSubmission([]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header title="Danh sách bài nộp" isHome={false} navigation={navigation} />
      {isLoading ? (
        <Searching />
      ) : listSubmissions.length ? (
        <FlatList data={listSubmissions} renderItem={renderItem} />
      ) : (
        <NoData title="Chưa có bài nộp nào!" />
      )}
    </View>
  );
};
