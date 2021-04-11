import React from "react";
import { useDispatch, useSelector } from "react-redux";

import QuizzesCard from "../../components/molecules/QuizzesCard"; 
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, StatusBar} from "react-native";



const ListTest= ({navigation}) => {

  const quizzesList = useSelector(state => state.quizzesList)
  const openAddQuizzes = () => {
    navigation.navigate('CreateQuizzes' )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor ="red" barStyle ="dark-content"/>
      <ScrollView contentContainerStyle={styles.listQuiz} >
        {quizzesList.map(quizzes => (
          <QuizzesCard key={quizzes._quizzesId} {...quizzes} navigation={navigation} />
        ))}

      </ScrollView>
      <TouchableOpacity style={styles.addQuizzes} onPress={()=>openAddQuizzes()}>
        <Image style={styles.addIcon} source={require('../../assets/images/buttonAdd.png')}></Image>
      </TouchableOpacity>
      </View>
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
    paddingBottom: 100,
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