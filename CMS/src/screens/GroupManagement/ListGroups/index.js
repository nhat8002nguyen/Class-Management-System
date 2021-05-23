import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity, Text, FlatList, Dimensions} from 'react-native';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import Group from './Group';
import NoData from '../../../components/NoData';
import Searching from '../../../components/Searching';
import Header from '../../../components/Header';
import api from '../api';
import ModalJoinGroup from './ModalJoinGroup';
import {TabView, SceneMap} from 'react-native-tab-view';
const CLASS_ID = 'd92b8c7f-afee-4700-a350-4d9c5b288040';
const USER_ID = 'd92b8c7f-afee-4700-a350-4d9c5b288041';
import {colors} from '../../../styles';
import {useSelector} from 'react-redux';
export default ListGroups = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const {userSignin} = useSelector(s => s.userSignin);
  const [listGroupsJoined, setListGroupsJoined] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [modalJoinGroup, setModalJoinGroup] = useState(false);
  const groupSelected = useRef(null);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const [joined, all] = await Promise.all([
        api.getListGroupsByUserId(CLASS_ID),
        api.getListGroupsByClassId(CLASS_ID),
      ]);
      setListGroupsJoined(joined?.data || []);
      setAllGroups(all?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onJoinGroup = item => {
    groupSelected.current = item;
    setModalJoinGroup(true);
  };
  const onMoveToCreateGroup = () => navigation.navigate('CreateGroup');
  const onCloseModalJoinGroup = () => setModalJoinGroup(false);
  const onAccessGroup = () => {};
  const FirstRoute = () =>
    isLoading ? (
      <Searching />
    ) : listGroupsJoined.length ? (
      <FlatList
      contentContainerStyle = {{marginTop: 15}}

        data={listGroupsJoined}
        keyExtractor={(_, index) => index}
        renderItem={({item, index}) => (
          <Group onPress={onAccessGroup} item={item} />
        )}
      />
    ) : (
      <NoData title="Bạn chưa tham gia nhóm nào!" />
    );
  const SecondRoute = () =>
    isLoading ? (
      <Searching />
    ) : allGroups.length ? (
      <FlatList
        contentContainerStyle = {{marginTop: 15}}
        data={allGroups}
        keyExtractor={(_, index) => index}
        renderItem={({item, index}) => (
          <Group onPress={onJoinGroup} item={item} />
        )}
      />
    ) : (
      <NoData title="Không tìm thấy nhóm nào!" />
    );

  const TabBar = ({navigationState, position}) => {
    return (
      <View style={styles.tab}>
        {navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{
                flex: 1,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  navigationState.index === i ? colors.PRIMARY : colors.WHITE,
              }}
              onPress={() => setIndex(i)}>
              <Text
                style={{
                  color: navigationState.index === i ? colors.WHITE : '#EBEBEB',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const [routes] = useState([
    {key: 'first', title: 'Đã tham gia'},
    {key: 'second', title: 'Tất cả'},
  ]);
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View style={styles.container}>
      <Header title="Nhóm" isHome={false} navigation={navigation} />
      {/* <Text
        style={{...styles.mediumBoldText, marginHorizontal: 10, marginTop: 5}}>
        Đã tham gia ({listGroupsJoined?.length})
      </Text> */}
      <TabView
        swipeEnabled={false}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: width}}
        renderTabBar={props => <TabBar {...props} />}
      />
      {/* {listGroupsJoined.length ? (
        <FlatList
          contentContainerStyle={{marginTop: 5}}
          keyExtractor={item => item}
          data={listGroupsJoined}
          renderItem={({item, index}) => <Group />}
          ListFooterComponent={() => <View style={{height: 10}} />}
        />
      ) : null}
      <Text
        style={{...styles.mediumBoldText, marginHorizontal: 10, marginTop: 5}}>
        Tất cả ({allGroups?.length})
      </Text>
      {allGroups.length ? (
        <FlatList
          contentContainerStyle={{marginTop: 5}}
          keyExtractor={item => item}
          data={allGroups}
          ListFooterComponent={() => <View style={{height: 10}} />}
          renderItem={({item, index}) => (
            <Group item={item} onPress={() => onJoinGroup(item)} />
          )}
        />
      ) : null} */}
      {userSignin?.userInfo?.type != 1 && (
        <TouchableOpacity style={styles.addBtn} onPress={onMoveToCreateGroup}>
          <Feather name="plus" color="white" size={40} />
        </TouchableOpacity>
      )}

      <ModalJoinGroup
        group={groupSelected.current}
        visible={modalJoinGroup}
        onClose={onCloseModalJoinGroup}
        userId={USER_ID}
      />
    </View>
  );
};
