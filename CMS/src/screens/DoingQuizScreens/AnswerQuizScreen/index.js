import React, {
  useState,
  useFocusEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export default AnswerQuizScreen = () => {
  const answers = [
    {
      color: '#E3B440',
      answer: 'Answer 1',
    },
    {
      color: '#E44E29',
      answer: 'Answer 2',
    },
    {
      color: '#0E9D8C',
      answer: 'Answer 3',
    },
    {
      color: '#164051',
      answer: 'Answer 4',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      <View style={styles.quizInfo}>
        <Text style={styles.quizDetails}>128030</Text>
        <Text style={styles.quizDetails}>quiz-name</Text>
      </View>
      <View style={styles.answersBox}>
        <View style={styles.questionInfo}>
          <Text style={styles.questionOrd}>question-ord</Text>
          <View style={styles.qContentBox}>
            <Text style={styles.questionContent}>question-content</Text>
          </View>
        </View>

        <View style={styles.answers}>
          {answers.map((el, index) => (
            <AnswerBox key={index} {...el} />
          ))}
        </View>
      </View>
      <View style={styles.scoreBox}>
        <Text style={styles.scoreItem}>#Student-name</Text>
        <Text style={styles.scoreItem}>#Student-score</Text>
      </View>
    </View>
  );
};

const AnswerBox = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('RankScreen')}>
      <View style={[styles.answerBox, {backgroundColor: props.color}]}>
        <Text style={styles.answer}>{props.answer}</Text>
      </View>
    </TouchableOpacity>
  );
};
