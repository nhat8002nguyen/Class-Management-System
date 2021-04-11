import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity } from "react-native";

const QuizCard = (props) => {

  const openEditCreatedQuiz = () => {
    props.navigation.navigate('CreateAQuiz',{
      quizId: props._quizId,
      quizzesId: props.quizzesId,
      quizImage: props.quizImage,
      quizDescription: props.quizDescription,
      answers: props.answers,
      quizTime: props.quizTime,
    });
  }  

  return (
    <TouchableNativeFeedback >
      <View style={styles.aQuiz}>
        <Text style={styles.numQuiz}>{props.quizNum}</Text>
        <View style={styles.quizImage}>
          <Image style={styles.quizImage} source={{uri: props.quizImage}}></Image>
        </View>
        <Text style={styles.question}>{props.quizDescription}</Text>
        <TouchableOpacity onPress={openEditCreatedQuiz}>
          <Image style={styles.quizIcon} source={require('../images/edit.webp')}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.quizIcon} source={require('../images/delete.png')}></Image>
        </TouchableOpacity>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  aQuiz: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    width: 360,
    height: 64,
    backgroundColor: "#F28D3E",
    marginTop: 15,
    borderRadius: 10,
  },
  numQuiz: {
    color: "white",
    position: 'relative',
    left: 10,
    bottom: 20,
    marginRight: 15,
  },
  quizImage: {
    width: 55,
    height: 42,
    backgroundColor: "white",
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

export default QuizCard;