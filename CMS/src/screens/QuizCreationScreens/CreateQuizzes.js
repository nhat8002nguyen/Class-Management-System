import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableNativeFeedback } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, } from "react-native";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import QuizCard from "../../components/molecules/QuizCard";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";
import { v4 } from "uuid";

const CreateQuizzes = ({route,navigation}) => {

  const quizzesId = route.params ? route.params.quizzesId : "";
  const [quizzesName, setQuizzesName] = useState(route.params ? route.params.quizzesName : "");
  const [quizzesImage, setQuizzesImage] = useState(route.params ? route.params.quizzesImage: "");
  const [quizzesDescription, setQuizzesDescripition] = useState(route.params ? route.params.quizzesDescription : "");
  const [quizzes, setQuizzes] = useState(route.params.quizzes ? route.params.quizzes : []);

  const quizzesList = useSelector(state => state.quizzesList);

  const newQuizzes = quizzesList.filter(quizzes => quizzes._quizzesId === quizzesId)[0].quizzes;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        route.params.quizzesId !== null ? 
        <Text style={styles.headerTitle}>Edit Quizzes</Text>
        : <Text style={styles.headerTitle}>Create Quizzes</Text>
      ),
    });
    setQuizzes(newQuizzes);  
  }, [navigation])


  const openAddAQuiz = () => {
    navigation.navigate('CreateAQuiz', {quizzesId: quizzesId});
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.testDetail}>
        <Text style={styles.fieldName}>Tap to add image</Text>
        <View style={[styles.bigImage, styles.input]}>
          <TouchableOpacity>
            <Image style={styles.image} source={{uri: quizzesImage }}></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.fieldName}>Subject</Text>
        <TextInput style={[styles.input,styles.inputText]} value={quizzesName} onChangeText={text => setQuizzesName(text)}></TextInput>
        <Text style={styles.fieldName}>Description</Text>
        <TextInput style={[styles.input, styles.inputText]} value={quizzesDescription} onChangeText={text => setQuizzesDescripition(text)}></TextInput>
      </View>
      <View style={styles.viewQuestions}>
        <Text style={styles.fieldName}>Questions({quizzes.length})</Text>
        <ScrollView contentContainerStyle={styles.questions}>
          {quizzes.map( quiz => (
            <QuizCard key={quiz._quizId} {...quiz} quizzesId={quizzesId} navigation={navigation}/>
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomButton}>
        <TouchableNativeFeedback onPress={openAddAQuiz}>
          <View style={styles.buttonAdd}>
            <Text>Add Quiz</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableOpacity onPress={() => navigation.navigate('ListTest')}>
          <Image style={styles.acceptTest} source={require('../../assets/images/check.jpeg')}></Image>
        </TouchableOpacity>
      </View>
       
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F28D3E",
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
  bottomButton: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
  acceptTest: {
    width: 40,
    height: 40,
  },
});

export default CreateQuizzes;