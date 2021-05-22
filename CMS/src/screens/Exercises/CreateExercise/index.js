import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../../components/Header';
import SelectComponent from '../../../components/SelectComponent';
import {colors} from '../../../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default CreateExercise = ({navigation}) => {
  /*{
  "name": "Sample 1",
  "description": "Sample 1",
  "type": 1,
  "startTime": "2021-05-05 00:00:00",
  "endTime": "2021-05-10 00:00:00"
}*/

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const typeRef = useRef([0]);
  const [startTime, setStartTime] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const typeTimeRef = useRef('start');
  const listType = [
    {key: 0, value: 'Tự luận'},
    {key: 1, value: 'Trắc nghiệm'},
    {key: 3, value: 'Cả 2'},
  ];
  const onCheckedType = list => {
    typeRef.current = list;
  };
  const onChangeInput = (flag, text) => {
    switch (flag) {
      case 'name':
        setName(text);
        break;
      case 'des':
        setDescription(text);
        break;
      case 'start':
        setStartTime(text);
        break;
      case 'end':
        setEndTime(text);
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
    console.log(typeTimeRef.current);
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
    console.log(flag);
    setTimePicker(true);
  };
  const onOpenDatePicker = flag => {
    typeTimeRef.current = flag;
    console.log(flag);
    setDatePicker(true);
  };
  const onAdd = async () => {
    let data = {
      type: typeRef.current
    }
    navigation.navigate('SetUpExercise', data)
  };
  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
      <Header title="Tạo bài tập lớn" isHome={false} navigation={navigation} />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <Text style={styles.smallBoldText}>Tên bài tập</Text>
        <TextInput
          value={name}
          style={styles.input}
          placeholder="Nhập tên bài tập"
          onChangeText={text => onChangeInput('name', text)}
        />
        <Text style={styles.smallBoldText}>Loại bài tập</Text>
        <View style={styles.selectWrap}>
          <SelectComponent
            items={listType}
            iconColor={colors.PRIMARY}
            checked={typeRef.current}
            multipleChoose={false}
            onChecked={onCheckedType}
          />
        </View>
        <Text style={styles.smallBoldText}>Mô tả</Text>
        <TextInput
          value={description}
          style={styles.input}
          placeholder="Mô tả ngắn về bài tập"
          onChangeText={text => onChangeInput('des', text)}
        />

        <Text style={styles.smallBoldText}>Thời gian bắt đầu</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              ...styles.input,
              flex: 3,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 10,
            }}
            onPress={() => onOpenDatePicker('start')}>
            <Text>{moment(startDate).format('DD/MM/YYYY')}</Text>
            <Feather name="calendar" size={20} color={colors.PRIMARY} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.input,
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => onOpenTimePicker('start')}>
            <Text>{moment(startTime).format('HH:mm')}</Text>
            <Feather name="clock" size={20} color={colors.PRIMARY} />
          </TouchableOpacity>
        </View>

        <Text style={styles.smallBoldText}>Thời gian kết thúc</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              ...styles.input,
              flex: 3,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 10,
            }}
            onPress={() => onOpenDatePicker('end')}>
            <Text>{moment(endDate).format('DD/MM/YYYY')}</Text>
            <Feather name="calendar" size={20} color={colors.PRIMARY} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.input,
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => onOpenTimePicker('end')}>
            <Text>{moment(endTime).format('HH:mm')}</Text>
            <Feather name="clock" size={20} color={colors.PRIMARY} />
          </TouchableOpacity>
        </View>
        <Text style={styles.smallBoldText}>Link nộp</Text>
        <TextInput
          value={description}
          style={styles.input}
          placeholder="Link nộp bài"
          onChangeText={text => onChangeInput('des', text)}
        />
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
      </ScrollView>
      </>
    // </TouchableWithoutFeedback>
  );
};
