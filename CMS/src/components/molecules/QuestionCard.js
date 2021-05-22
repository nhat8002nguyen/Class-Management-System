import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {
  listQuestion,
  removeQuestion,
} from '../../redux/actions/questionActions';

const QuestionCard = props => {
  const dispatch = useDispatch();

  const openEditCreatedQuestion = () => {
    props.navigation.navigate('CreateQuestion', {
      questionId: props.questionId,
      _quizId: props._quizId,
      questionImage: props.questionImage,
      questionDescription: props.questionDescription,
      answers: props.answers,
      correctAnswer: props.correctAnswer,
      questionTime: props.questionTime,
    });
  };

  const onDeleteQuestion = async () => {
    await dispatch(removeQuestion(props.questionId));
    dispatch(listQuestion(props._quizId));
  };

  return (
    <TouchableNativeFeedback>
      <View style={styles.aQuiz}>
        <Text style={styles.numQuiz}>{props.ordNum}</Text>
        <View style={styles.quizImage}>
          <Image
            style={styles.quizImage}
            source={{uri: props.questionImage}}></Image>
        </View>
        <Text style={styles.question}>
          {props.questionDescription.length < 25
            ? props.questionDescription
            : props.questionDescription.substring(0, 25) + '...'}
        </Text>
        <TouchableOpacity onPress={openEditCreatedQuestion}>
          <Icon name="edit" color="white" size={30} style={styles.quizIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteQuestion}>
          <Icon name="delete" color="white" size={30} style={styles.quizIcon} />
        </TouchableOpacity>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  aQuiz: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 360,
    height: 64,
    backgroundColor: '#F28D3E',
    marginTop: 15,
    borderRadius: 10,
  },
  numQuiz: {
    color: 'white',
    position: 'relative',
    left: 10,
    bottom: 20,
    marginRight: 15,
  },
  quizImage: {
    width: 55,
    height: 42,
    backgroundColor: 'white',
    marginRight: 15,
  },
  question: {
    color: 'white',
    width: 120,
  },
  quizIcon: {
    width: 30,
    height: 30,
    marginLeft: 30,
  },
});

export default QuestionCard;
