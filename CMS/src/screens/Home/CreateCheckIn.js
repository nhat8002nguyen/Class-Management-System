import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView, 
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import {colors} from '../../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import api from './api';
import {useSelector} from 'react-redux'
export default CreateCheckIn = ({navigation}) => {
  /*{
  "name": "Sample 1",
  "description": "Sample 1",
  "type": 1,
  "startTime": "2021-05-05 00:00:00",
  "endTime": "2021-05-10 00:00:00"
}*/
  const [timePicker, setTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [err, setErr] = useState('');
  const [isHandling, setIsHandling] = useState(false);
  const typeTimeRef = useRef('start');
  const {classId} = useSelector(state => state.classId);


  const onChangeTime = (event, selectedDate) => {
    const currentDate =
      selectedDate || (typeTimeRef.current === 'start' ? startTime : endTime);
    setTimePicker(false);
    if (typeTimeRef.current === 'start') {
      setStartTime(currentDate);
    } else {
      setEndTime(currentDate);
    }
  };
  const onOpenTimePicker = flag => {
    typeTimeRef.current = flag;
    setTimePicker(true);
  };

  const onAdd = async () => {
    if(moment(endTime) <= moment()){
      setErr('Thời gian kết thúc không được sớm hơn hiện tại')
      return
    }
    setIsHandling(true);
    let data = {
      startTime,
      endTime
    };
    try {
      const res = await api.createCheckIn(classId, data);
      if (res) {
        navigation.goBack();
      } else {
        setErr('Đã xảy ra sự cố. Vui lòng thử lại sau');
        return;
      }
    } catch (error) {
      console.log(error);
      setErr('Đã xảy ra sự cố. Vui lòng thử lại sau');
      return;
    } finally {
      setIsHandling(false);
    }
  };
  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <Header title="Tạo điểm danh" isHome={false} navigation={navigation} />
      {err.length ? (
        <Text
          style={{
            fontWeight: 'bold',
            color: 'red',
            textAlign: 'center',
            marginVertical: 5,
          }}>
          {err}
        </Text>
      ) : null}
      <ScrollView
        style={{flex: 1, paddingHorizontal: 10}}
        keyboardShouldPersistTaps="always">
        <Text style={styles.smallBoldText}>Giờ bắt đầu</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              ...styles.input,
              flex: 2,
              flexDirection: 'row',
            }}
            onPress={() => onOpenTimePicker('start')}>
            <MaterialCommunityIcons
              name="timer"
              size={20}
              color={colors.PRIMARY}
              style={{marginRight: 5}}
            />

            <Text>{moment(startTime).format('HH:mm')}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.smallBoldText}>Giờ kết thúc</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              ...styles.input,
              flex: 2,
              flexDirection: 'row',
            }}
            onPress={() => onOpenTimePicker('end')}>
            <MaterialCommunityIcons
              name="timer-off"
              size={20}
              color={colors.PRIMARY}
              style={{marginRight: 5}}
            />

            <Text>{moment(endTime).format('HH:mm')}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
            Tạo
          </Text>
        </TouchableOpacity>
        {timePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={typeTimeRef.current === 'start' ? startTime : endTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}
        <Loading visible={isHandling} />
      </ScrollView>
    </KeyboardAvoidingView>
    // </TouchableWithoutFeedback>
  );
};
