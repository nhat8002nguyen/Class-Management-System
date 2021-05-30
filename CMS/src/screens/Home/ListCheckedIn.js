import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import api from './api';
import Header from '../../components/Header';
import NoData from '../../components/NoData';
import Searching from '../../components/Searching';
import styles from './styles';
export default ListCheckedIn = ({navigation, route}) => {
  const [list, setList] = useState([]);
  const {classId} = useSelector(state => state.classId);
  const {id, endTime, startTime} = route.params;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    const res = await api.getListCheckedIn(classId, id);
    if (res) {
      setList(res.data);
      console.log(res.data);
      setLoading(false);
    } else {
      console.log('loi');
    }
  };
  const Item = ({item}) => (
    <View
      style={{
        width: '95%',
        padding: 10,
        borderRadius: 10,
        shadowOpacity: 0.9,
        shadowOffset: {height: 13, width: 55},
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        elevation: 6,
        shadowRadius: 15,
        alignSelf: 'center',
        backgroundColor: 'white',
        marginVertical: 8,
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 19}}>
        {item?.userName || ''}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
        <Text>Giờ điểm danh</Text>
        <Text style={{fontWeight: '700'}}>
          {moment(item?.checkInTime).format('DD/MM/YYYY HH:mm')}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
        <Text>Tình trạng</Text>
        <Text
          style={{
            fontWeight: '700',
            color:
              moment(item?.checkInTime) >= moment(endTime) ? 'red' : 'green',
          }}>
          {moment(item?.checkInTime) >= moment(endTime)
            ? 'Điểm danh trễ'
            : 'Điểm danh hợp lệ'}
        </Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Header isHome={false} title="Danh sách điểm danh" />
      {loading ? (
        <Searching />
      ) : list.length === 0 ? (
        <NoData title="Chưa có sinh viên/học sinh nào điểm danh!" />
      ) : (
        <FlatList
          data={list}
          keyExtractor = {(_, idx)=> idx}
          renderItem={({item, index}) => <Item item={item} key={index} />}
        />
      )}
    </View>
  );
};
