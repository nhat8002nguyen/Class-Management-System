import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import NoData from '../../../components/NoData';
import Searching from '../../../components/Searching';
import Header from '../../../components/Header';
import api from '../api';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import {colors} from '../../../styles';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const CLASS_ID = 'd92b8c7f-afee-4700-a350-4d9c5b288040';
const ExamItem = ({item}) => {
  const {startTime, endTime, name, description, id} = item;
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timeOutRef = useRef();
  const [isCollapsed, setIsCollapsed] = useState(true);
  function msToDHMS(duration) {
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    let days = parseInt(duration / (1000 * 60 * 60 * 24));
    minutes = minutes < 10 ? '0' + minutes : hours > 99 ? '59' : minutes;
    hours = hours < 10 ? '0' + hours : hours > 99 ? 99 : hours;
    return days + ' ngày ' + hours + ' giờ ' + minutes + ' phút';
  }
  useEffect(() => {
    setTimeRemaining(moment(endTime) - moment().utc());
    if (timeOutRef.current) {
      clearInterval(timeOutRef.current);
    }
    timeOutRef.current = setInterval(() => {
      setTimeRemaining(moment(endTime)- moment().utc());
    }, 1000 * 60);
  }, []);
  return (
    <View key={id} style={styles.groupItem}>
      <Text style={styles.mediumBoldText}>{name}</Text>
      <View style={styles.row}>
        <MaterialIcons name="timer" size={22} color={colors.PRIMARY} />
        <Text style={{...styles.smallBoldText, marginLeft: 5}}>
          {moment(startTime).utc().format('HH:mm')} ngày{' '}
          {moment(startTime).utc().format('DD/MM/YYYY')}
        </Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="timer-off" size={22} color={colors.PRIMARY} />
        <Text style={{...styles.smallBoldText, marginLeft: 5}}>
          {moment(endTime).utc().format('HH:mm')} ngày{' '}
          {moment(endTime).utc().format('DD/MM/YYYY')}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setIsCollapsed(!isCollapsed)}
        style={{
          flexDirection: 'row',
          marginTop: 8,
          alignItems: 'flex-end',
          padding: 3,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons
            name="notes"
            size={22}
            color={colors.PRIMARY}
            style={{marginBottom: 4}}
          />
          <Text style={{fontWeight: 'bold', marginLeft: 5}}>
            Yêu cầu bài tập
          </Text>
        </View>

        <MaterialIcons
          name={isCollapsed ? 'chevron-right' : 'keyboard-arrow-down'}
          size={27}
          color={colors.PRIMARY}
        />
      </TouchableOpacity>
      {isCollapsed ? (
        <Text
          onPress={() => setIsCollapsed(!isCollapsed)}
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{marginLeft: 8}}>
          {description}
        </Text>
      ) : (
        <Collapsible collapsed={isCollapsed}>
          <Text
            onPress={() => setIsCollapsed(!isCollapsed)}
            style={{marginLeft: 8}}>
            {description}
          </Text>
        </Collapsible>
      )}

      <View
        style={{
          borderRadius: 10,
          backgroundColor: timeRemaining < 0 ? 'red' : 'green',
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        {timeRemaining < 0 ? (
          <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>
            Đã hết hạn
          </Text>
        ) : (
          <>
            <Text style={{fontSize: 14, color: 'white'}}>
              Thời gian còn lại
            </Text>
            <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>
              {msToDHMS(timeRemaining - 7*1000*60*60)}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default ListExam = ({navigation}) => {
  const {userSignin} = useSelector(s => s.userSignin);
  const isFocused = useIsFocused();
  const [listExams, setListExams] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    try {
      const res = await api.getListExam(CLASS_ID, userSignin?.userInfo?.type);
      setListExams(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const _updateSections = sections => {
    setActiveSections(sections);
  };
  const onMoveToCreateExam = () => {
    navigation.navigate('CreateExercise');
  };
  const onHiddenBtnPress = (item) =>{
    if(userSignin?.userInfo?.type === 1){
      return;
    } else{
      navigation.navigate('Grade', item)
    }
  }
  const _renderContent = section => {
    return (
      <TouchableOpacity
      onPress= {()=> onHiddenBtnPress(section)}
        style={{...styles.btn, backgroundColor: colors.PRIMARY}}>
        <Text style={{color: 'white', fontSize: 17}}>
          {userSignin?.userInfo?.type === 1 ? 'Nộp bài' : 'Chấm bài'}
        </Text>
      </TouchableOpacity>
    );
  };
  const _renderHeader = section => {
    return <ExamItem item={section} />;
  };
  return (
    <View style={styles.container}>
      <Header title="Bài tập lớn" isHome={false} navigation={navigation} />

      {userSignin?.userInfo?.type != 1 && (
        <TouchableOpacity style={styles.addBtn} onPress={onMoveToCreateExam}>
          <Feather name="plus" color="white" size={40} />
        </TouchableOpacity>
      )}
      {isLoading ? (
        <Searching />
      ) : listExams.length ? (
        <ScrollView>
          <Accordion
            sections={listExams}
            activeSections={activeSections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
            underlayColor="#EEEEEE"
            containerStyle ={{marginBottom: 60}}
          />
        </ScrollView>
      ) : (
        <NoData title="Không tìm thấy bài tập lớn nào!" />
      )}
    </View>
  );
};
