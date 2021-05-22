import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../../../components/Header';
import SelectComponent from '../../../components/SelectComponent';
import exerciseActions from '../../../redux/actions/exerciseActions';
import {colors} from '../../../styles';
import {useSelector, useDispatch} from 'react-redux';
export default SetUpExercise = ({navigation, route}) => {
  /*{
  "name": "Sample 1",
  "description": "Sample 1",
  "type": 1,
  "startTime": "2021-05-05 00:00:00",
  "endTime": "2021-05-10 00:00:00"
}*/
  const [content, setContent] = useState('');
  const {exercise} = useSelector(state => state);
  const dispatch = useDispatch();
  const onAdd = () => {
    if (content === '') return;
    dispatch(exerciseActions.addQuestion({content}));
    setContent('');
  };
  const onRemoveQuestion = (index) =>{
    dispatch(exerciseActions.removeQuestion(index))
  }
  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <>
      <Header
        title="Thiết lập bài tập"
        isHome={false}
        navigation={navigation}
      />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        {exercise.map((item, index) => (
          <View style={styles.box} key = {index}>
            <Text style={{width: '95%'}}>
              {index}
              {'. '}
              {item?.content}
            </Text>
            <TouchableOpacity style={{flex: 1}} onPress = {()=> onRemoveQuestion(index)}>
              <Ionicons name="close-circle" size={20} color={colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        ))}
        <View style = {{height: 80}}/>
      </ScrollView>
      <View style = {styles.row}>
        <TextInput
          value={content}
          style={styles.input}
          placeholder="Nhập câu hỏi"
          onChangeText={text => setContent(text)}
        />
        <TouchableOpacity  onPress={onAdd} style = {{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <AntDesign name ="pluscircle" size = {30} color = 'white'/>
        </TouchableOpacity>
        </View>
    </>
    // </TouchableWithoutFeedback>
  );
};
