import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";


const CreateAQuiz = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('CreateQuizzes')}>
          <Image style={styles.acceptTest} source={require('../images/check.jpeg')}></Image>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.quizDetail}>
        <Text style={styles.fieldName}>Tap to add image or video</Text>
        <TouchableOpacity>
        <Image style={styles.image} source={require('../images/phan_thiet.jpg')}></Image>
        </TouchableOpacity>
        <Text style={styles.fieldName}>Add question</Text>
        <TextInput style={styles.textInput}></TextInput>
        <View style={styles.answer}>
        <TextInput style={styles.textInput} placeholder="+ add an answer"></TextInput>
        <TextInput style={styles.textInput} placeholder="+ add an answer"></TextInput>
        <TextInput style={styles.textInput} placeholder="+ add an answer (optional)"></TextInput>
        <TextInput style={styles.textInput} placeholder="+ add an answer (optional)"></TextInput>
        </View>
        <View style={styles.row}>
          <View style={styles.time}>
          <TextInput style={styles.timeInput} keyboardType="numeric"></TextInput>
          <Text>S</Text>
          </View>
        </View>
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
  quizDetail: {
    marginTop: 30,
    width: 360,
    alignItems: "flex-start",
  },
  image: {
    width: 360,
    height: 220, 
  },
  fieldName: {
    color: "#F28D3E",
    marginTop: 10,
  },
  answer: {
    marginTop: 20,
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#F28D3E",
    width: '100%',
    borderRadius: 10,
    backgroundColor: "#F28D3E",
    color: "white",
    marginBottom: 5,
    
  },
  row: {
    display: 'flex',
    flexDirection: "row",
    width: '100%',
    justifyContent: 'space-between',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#F28D3E',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default CreateAQuiz;