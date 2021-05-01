import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {TouchableHighlight} from 'react-native';
import {TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {listQuiz, removeQuiz} from '../../redux/actions/quizActions';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const QuizCard = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [beginDate, setBeginDate] = useState(props.quizBeginTime);
  const [endDate, setEndDate] = useState(props.quizEndTime);
  const [beginMode, setBeginMode] = useState('date');
  const [endMode, setEndMode] = useState('date');
  const [showBeginMode, setShowBeginMode] = useState(false);
  const [showEndMode, setShowEndMode] = useState(false);

  const onChangeBeginDate = (event, selectedDate) => {
    const currentDate = selectedDate || beginDate;
    setBeginDate(currentDate);
    setShowBeginMode(false);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setShowEndMode(false);
  };

  const showBMode = currentMode => {
    setShowBeginMode(true);
    setBeginMode(currentMode);
  };

  const showEMode = currentMode => {
    setShowEndMode(true);
    setEndMode(currentMode);
  };

  const showBeginDatepicker = () => {
    showBMode('date');
  };

  const showBeginTimepicker = () => {
    showBMode('time');
  };

  const showEndDatepicker = () => {
    showEMode('date');
  };

  const showEndTimepicker = () => {
    showEMode('time');
  };

  const onDeleteQuiz = () => {
    dispatch(removeQuiz(props._quizId));
    dispatch(listQuiz());
  };

  const editCreatedQuiz = () => {
    navigation.navigate('CreateQuiz', {
      quizId: props._quizId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quizNameAndStatus}>
        {props.quizName.length < 25
          ? props.quizName
          : props.quizName.substring(0, 25) + '...'}
      </Text>
      <View style={styles.row}>
        <Text style={styles.field}>Begin Time</Text>
        <View style={styles.viewDate}>
          <TouchableHighlight onPress={showBeginDatepicker}>
            <Text>{beginDate.toLocaleDateString()}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={showBeginTimepicker}>
            <Text>{beginDate.toLocaleTimeString()}</Text>
          </TouchableHighlight>
          <Image
            style={styles.calIcon}
            source={require('../../assets/images/calendarIcon.png')}></Image>
        </View>

        {showBeginMode && (
          <DateTimePicker
            testID="dateTimePicker"
            value={beginDate}
            mode={beginMode}
            is24Hour={true}
            display="default"
            onChange={onChangeBeginDate}
          />
        )}
      </View>
      <View style={styles.row}>
        <Text style={styles.field}>End Time</Text>
        <View style={styles.viewDate}>
          <TouchableHighlight onPress={showEndDatepicker}>
            <Text>{endDate.toLocaleDateString()}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={showEndTimepicker}>
            <Text>{endDate.toLocaleTimeString()}</Text>
          </TouchableHighlight>
          <Image
            style={styles.calIcon}
            source={require('../../assets/images/calendarIcon.png')}></Image>
        </View>
      </View>
      <Text style={styles.quizNameAndStatus}>{props.quizStatus}</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={editCreatedQuiz}>
          <View style={styles.button}>
            <Text>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Scores')}>
          <View style={styles.button}>
            <Text>Score</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteQuiz}>
          <Icon name="delete" color="white" size={30} />
        </TouchableOpacity>
        {showEndMode && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode={endMode}
            is24Hour={true}
            display="default"
            onChange={onChangeEndDate}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'column',
    width: 323,
    height: 210,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  quizNameAndStatus: {
    fontWeight: '700',
    position: 'relative',
    left: 20,
    color: 'white',
    marginTop: 10,
  },
  quizStatus: {
    color: 'green',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    backgroundColor: 'white',
    color: 'orange',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  field: {
    color: 'white',
    fontWeight: '700',
  },
  viewDate: {
    width: 160,
    height: 28,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  calIcon: {
    width: 20,
    height: 20,
    resizeMode: 'stretch',
  },
  deleteIcon: {
    width: 30,
    height: 30,
  },
});

export default QuizCard;
