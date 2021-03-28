import React from "react";
import Quizzes from "../elements/QuizzesCard"; 
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, } from "react-native";



const ListTest= ({navigation}) => {

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.listQuiz} >
        <Quizzes navigation={navigation}/>
        <Quizzes navigation={navigation}/>
        <Quizzes navigation={navigation}/>
        <Quizzes navigation={navigation}/>
      </ScrollView>
      <TouchableOpacity style={styles.addQuizzes} onPress={() => navigation.navigate('CreateQuizzes')}>
        <Image style={styles.addIcon} source={require('../images/buttonAdd.png')}></Image>
      </TouchableOpacity>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'orange',
    fontSize: 28,
    fontWeight: '700',
  },
  
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    paddingBottom: 150,
    minHeight: 800,
  },
  addQuizzes: {
    position: 'absolute',
    bottom: 150,
    right: 20, 
  },
  addIcon: {
    width: 50,
    height: 50,
    resizeMode: "stretch",
  }
})

export default ListTest;