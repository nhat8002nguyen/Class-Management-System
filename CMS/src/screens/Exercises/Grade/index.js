import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NoData from '../../../components/NoData';
import Searching from '../../../components/Searching';
import Header from '../../../components/Header';
import api from '../api';

export default Grade = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listSubmissions, setListSubmission] = useState([]);

  useEffect(() => {
    getData();
  }, []);

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
      <Header title="Chấm điểm" isHome={false} navigation={navigation} />
      {isLoading ? (
        <Searching />
      ) : listSubmissions.length ? null : (
        <NoData title="Chưa có bài nộp nào!" />
      )}
    </View>
  );
};
