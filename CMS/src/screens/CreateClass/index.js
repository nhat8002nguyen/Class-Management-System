import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
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
const CLASS_ID = 'd92b8c7f-afee-4700-a350-4d9c5b288040';
import api from './api'
export default CreateClass = ({navigation}) => {
  /*{
  "name": "Sample 1",
  "description": "Sample 1",
  "type": 1,
  "startTime": "2021-05-05 00:00:00",
  "endTime": "2021-05-10 00:00:00"
}*/

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [numMems, setNumMems] = useState('');
  const typeRef = useRef([0]);
  const [startTime, setStartTime] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const typeTimeRef = useRef('start');
  const [err, setErr] = useState('');
  const [isHandling, setIsHandling] = useState(false);
  const listType = [
    {key: 0, value: 'Tự luận'},
    {key: 1, value: 'Trắc nghiệm'},
    {key: 3, value: 'Cả 2'},
  ];
  const onCheckedType = list => {
    typeRef.current = list;
  };
  const onChangeInput = (flag, text) => {
    if (err != '') setErr('');
    switch (flag) {
      case 'name':
        setName(text);
        break;
      case 'des':
        setDescription(text);
        break;
      case 'mem':
        setNumMems(text);
        break;

      default:
        break;
    }
  };
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
  const onChangeDate = (event, selectedDate) => {
    const currentDate =
      selectedDate || (typeTimeRef.current === 'start' ? startDate : endDate);
    setDatePicker(false);
    if (typeTimeRef.current === 'start') {
      setStartDate(currentDate);
    } else {
      setEndDate(currentDate);
    }
  };
  const onOpenTimePicker = flag => {
    typeTimeRef.current = flag;
    setTimePicker(true);
  };
  const onOpenDatePicker = flag => {
    typeTimeRef.current = flag;
    setDatePicker(true);
  };
  const onAdd = async () => {
    if (name === '' || numMems === '' || description === '') {
      setErr('Vui lòng nhập đầy đủ');
      return;
    }
        setIsHandling(true);
    let data = {
      name,
      location: description,
      maxGroupMembers: numMems,
      startTime: moment(startTime).format('HH:mm'),
      endTime: moment(endTime).format('HH:mm'),
    };
    try {
      const res = await api.createClass(data);
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
      <Header title="Tạo lớp học" isHome={false} navigation={navigation} />
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
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <Text style={styles.smallBoldText}>Tên lớp học</Text>
        <TextInput
          value={name}
          style={styles.input}
          placeholder="Nhập tên lớp học(*)"
          onChangeText={text => onChangeInput('name', text)}
        />
        <Text style={styles.smallBoldText}>Số lượng thành viên tối đa</Text>
        <TextInput
          value={numMems}
          style={{...styles.input}}
          placeholder="Số lượng thành viên tối đa (*)"
          keyboardType="numeric"
          onChangeText={text => onChangeInput('mem', text)}
        />
        <Text style={styles.smallBoldText}>Phòng học</Text>
        <TextInput
          value={description}
          style={{...styles.input}}
          placeholder="Phòng học (*)"
          onChangeText={text => onChangeInput('des', text)}
        />

        <Text style={styles.smallBoldText}>Giờ vào lớp</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              ...styles.input,
              flex: 2,
              flexDirection: 'row',
            }}
            onPress={() => onOpenTimePicker('start')}>
            <MaterialCommunityIcons name="timer" size={20} color={colors.PRIMARY}  style = {{marginRight: 5}} />

            <Text>{moment(startTime).format('HH:mm')}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.smallBoldText}>Giờ tan lớp</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              ...styles.input,
              flex: 2,
              flexDirection: 'row',
            }}
            onPress={() => onOpenTimePicker('end')}>
            <MaterialCommunityIcons name="timer-off" size={20} color={colors.PRIMARY} style = {{marginRight: 5}}/>

            <Text>{moment(endTime).format('HH:mm')}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
            Tạo
          </Text>
        </TouchableOpacity>
        {datePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={typeTimeRef.current === 'start' ? startDate : endDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
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
