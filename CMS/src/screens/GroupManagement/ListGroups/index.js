import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import Group from './Group';
import Header from '../../../components/Header';
import api from '../api';
import ModalJoinGroup from './ModalJoinGroup'
const CLASS_ID = 'd92b8c7f-afee-4700-a350-4d9c5b288040';
const USER_ID = 'd92b8c7f-afee-4700-a350-4d9c5b288041';
export default ListGroups = ({navigation}) => {
  const onMoveToCreateGroup = () => navigation.navigate('CreateGroup');
  const [listGroupsJoined, setListGroupsJoined] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [modalJoinGroup, setModalJoinGroup] = useState(false)
  const groupSelected = useRef(null)
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const [joined, all] = await Promise.all([
        api.getListGroupsByUserId(USER_ID),
        api.getListGroupsByClassId(CLASS_ID),
      ]);
      setListGroupsJoined(joined?.data || []);
      setAllGroups(all?.data || []);
    } catch (error) {
      console.log(error);
    }
  };
  const onJoinGroup = (item) => {
    groupSelected.current = item
    setModalJoinGroup(true)
  };
  const onCloseModalJoinGroup = ()=> setModalJoinGroup(false)
  const onAccessGroup = () => {};
  return (
    <View style={styles.container}>
      <Header title="Nhóm" isHome={true} />
      <Text style={{...styles.mediumBoldText, marginHorizontal: 10, marginTop: 5}}>
        Đã tham gia ({listGroupsJoined?.length})
      </Text>
      {listGroupsJoined.length ? (
        <FlatList
          contentContainerStyle = {{marginTop: 5}}
          keyExtractor={item => item}
          data={listGroupsJoined}
          renderItem={({item, index}) => <Group />}
          ListFooterComponent = {()=> <View style ={{height: 10}}/>}

        />
      ) : null}
      <Text style={{...styles.mediumBoldText, marginHorizontal: 10, marginTop: 5}}>
        Tất cả ({allGroups?.length})
      </Text>
      {allGroups.length ? (
        <FlatList
          contentContainerStyle = {{marginTop: 5}}
          keyExtractor={item => item}
          data={allGroups}
          ListFooterComponent = {()=> <View style ={{height: 10}}/>}
          renderItem={({item, index}) => <Group item={item} onPress = {()=>onJoinGroup(item)}/>}
        />
      ) : null}
      <TouchableOpacity style={styles.addBtn} onPress={onMoveToCreateGroup}>
        <Feather name="plus" color="white" size={40} />
      </TouchableOpacity>
      <ModalJoinGroup group = {groupSelected.current} visible = {modalJoinGroup} onClose = {onCloseModalJoinGroup} userId = {USER_ID}/>
    </View>
  );
};
