import React, {
  useState,
  useFocusEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {takeCurrentQuiz} from '../../../redux/actions/currentQuizActions';

export default EnterPinScreen = () => {
  const [pin, setPin] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onEnterPin = () => {
    if (pin.length !== 0) {
      dispatch(takeCurrentQuiz(pin));
      navigation.navigate('EnterNameScreen');
    } else {
      alert('Enter pin!');
    }
  };

  useLayoutEffect(() => {}, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      <View style={styles.formInput}>
        <TextInput
          style={styles.pinInput}
          keyboardType="numeric"
          placeholder="PIN"
          onChangeText={text => setPin(text)}></TextInput>
        <TouchableOpacity onPress={onEnterPin}>
          <View style={styles.button}>
            <Text style={styles.buttonName}>Enter</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
