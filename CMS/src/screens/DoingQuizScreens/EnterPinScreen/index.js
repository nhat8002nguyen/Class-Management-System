import React, {
  useState,
  useFocusEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

export default EnterPinScreen = () => {
  const [pin, setPin] = useState('');
  const navigation = useNavigation();
  const onEnterPin = () => {
    navigation.navigate('EnterNameScreen');
  };

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
