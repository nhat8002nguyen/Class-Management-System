import React, {
  useState,
  useFocusEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from '../EnterPinScreen/styles';
import {useNavigation} from '@react-navigation/native';

export default EnterPinScreen = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const onEnterName = () => {
    navigation.navigate('AnswerQuizScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      <View style={styles.quizInfo}>
        <Text style={styles.quizDetails}>890293</Text>
        <Text style={styles.quizDetails}>Math</Text>
      </View>
      <View style={[styles.formInput, {marginTop: 100}]}>
        <TextInput
          style={styles.pinInput}
          placeholder="Name"
          onChangeText={text => setName(text)}></TextInput>
        <TouchableOpacity onPress={onEnterName}>
          <View style={styles.button}>
            <Text style={styles.buttonName}>Enter</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
