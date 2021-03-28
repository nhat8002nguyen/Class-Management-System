import React, { useLayoutEffect } from "react";
import { TouchableNativeFeedback } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, } from "react-native";

const CreateQuizzes = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ListTest')}>
          <Image style={styles.acceptTest} source={require('../images/check.jpeg')}></Image>
        </TouchableOpacity>
      ),
    })
  }, [navigation])
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.testDetail}>
        <Text style={styles.fieldName}>Tap to add image</Text>
        <View style={[styles.bigImage, styles.input]}>
          <TouchableOpacity>
            <Image style={styles.image} source={require('../images/phan_thiet.jpg')}></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.fieldName}>Subject</Text>
        <TextInput style={[styles.input,styles.inputText]}></TextInput>
        <Text style={styles.fieldName}>Description</Text>
        <TextInput style={[styles.input, styles.inputText]}></TextInput>
      </View>
      <View style={styles.viewQuestions}>
        <Text style={styles.fieldName}>Questions(2)</Text>
        <ScrollView contentContainerStyle={styles.questions}>
          <TouchableNativeFeedback >
            <View style={styles.aQuiz}>
              <Text style={styles.numQuiz}>1</Text>
              <View style={styles.quizImage}>
                <Image style={styles.quizImage} source={require('../images/phan_thiet.jpg')}></Image>
              </View>
              <Text style={styles.question}>How old are you ...</Text>
              <TouchableOpacity onPress={() => navigation.navigate('CreateAQuiz')}>
                <Image style={styles.quizIcon} source={require('../images/edit.webp')}></Image>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.quizIcon} source={require('../images/delete.png')}></Image>
              </TouchableOpacity>
            </View>
  
          </TouchableNativeFeedback>
          <TouchableNativeFeedback >
            <View style={styles.aQuiz}>
              <Text style={styles.numQuiz}>1</Text>
              <View style={styles.quizImage}>
                <Image style={styles.quizImage} source={require('../images/phan_thiet.jpg')}></Image>
              </View>
              <Text style={styles.question}>How old are you ...</Text>
              <TouchableOpacity onPress={() => navigation.navigate('CreateAQuiz')}>
                <Image style={styles.quizIcon} source={require('../images/edit.webp')}></Image>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.quizIcon} source={require('../images/delete.png')}></Image>
              </TouchableOpacity>
            </View>
  
          </TouchableNativeFeedback>  
          <TouchableNativeFeedback >
            <View style={styles.aQuiz}>
              <Text style={styles.numQuiz}>1</Text>
              <View style={styles.quizImage}>
                <Image style={styles.quizImage} source={require('../images/phan_thiet.jpg')}></Image>
              </View>
              <Text style={styles.question}>How old are you ...</Text>
              <TouchableOpacity onPress={() => navigation.navigate('CreateAQuiz')}>
                <Image style={styles.quizIcon} source={require('../images/edit.webp')}></Image>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.quizIcon} source={require('../images/delete.png')}></Image>
              </TouchableOpacity>
            </View>
  
          </TouchableNativeFeedback>
        </ScrollView>
      </View>
      <TouchableNativeFeedback onPress={() => navigation.navigate('CreateAQuiz')}>
        <View style={styles.buttonAdd}>
          <Text>Add Quiz</Text>
        </View>
      </TouchableNativeFeedback> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    paddingBottom: 50,
  },
  acceptTest: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  title: {
    color: 'orange',
    fontSize: 28,
    fontWeight: '700',
  },
  testDetail: {
    marginTop: 30,
    width: 360,
    alignItems: "flex-start",
  },
  bigImage: {
    height: 224,
  },
  image: {
    width: 360,
    height: 220, 
  },
  fieldName: {
    color: "#F28D3E",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#F28D3E",
    width: '100%',
    borderRadius: 10,
  },
  inputText: {
    backgroundColor: "#F28D3E",
    color: "white",
  },
  viewQuestions: {
    width: 360,
    alignItems: "flex-start",
    marginTop: 10,
    height: 200,
  },
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
  buttonAdd: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "orange",
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 10,
    position: 'absolute',
    bottom: 40,
    right: 20,
    opacity: 0.7,
  }
});

export default CreateQuizzes;