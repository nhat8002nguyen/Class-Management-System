import React, {useState, useFocusEffect, useCallback, useLayoutEffect} from 'react';
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
import {addAQuiz} from '../../redux/actions/quizzesActions';

const CreateAQuiz = ({navigation, route}) => {

  const isAddNewQuiz = Object.keys(route.params).length <= 1 ? true : false;
  const quizzesId = route.params.quizzesId;
  console.log(quizzesId);
  const quizId = isAddNewQuiz ? "" : route.params.quizId;
  const [quizImage, setQuizImage] = useState(isAddNewQuiz ? "https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg" : route.params.quizImage);
  const [quizDescription, setQuizDescription] = useState(
    isAddNewQuiz ? "" : route.params.quizDescription,
  );
  const [answers, setAnswers] = useState(isAddNewQuiz ? ["A ", "B ", "C ", "D "] : route.params.answers);
  const [quizTime, setQuizTime] = useState(isAddNewQuiz ? "" : route.params.quizTime);

  const dispatch = useDispatch();
  const quizzesList = useSelector(state => state.quizzesList);

  useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: () => (
          <Text style={styles.headerTitle}>
            {route.params.quizId !== null ? 'Edit Quiz' : 'Create A Quiz'}
          </Text>
        ),
      })
    },[navigation]
  )
      

  /* A quiz can be created with description, at least 2 answers A,B and quizTime. 
    Image and 2 last answers are optional
  */

  const onChangeAns0 = text => {
    setAnswers(pAnswers => pAnswers.map((a, i) => (a = i == 0 ? text : a)));
    console.log(answers);
  };
  const onChangeAns1 = text => {
    setAnswers(pAnswers => pAnswers.map((a, i) => (a = i == 1 ? text : a)));
  };
  const onChangeAns2 = text => {
    setAnswers(pAnswers => pAnswers.map((a, i) => (a = i == 2 ? text : a)));
  };
  const onChangeAns3 = text => {
    setAnswers(pAnswers => pAnswers.map((a, i) => (a = i == 3 ? text : a)));
  };

  const onAddOrUpdateQuiz = () => {
    if (
      quizDescription === '' ||
      answers[0] === '' ||
      answers[1] === '' ||
      quizTime === ''
    ) {
      alert('Wrong to edit or create quiz');
    } else {
      if (quizId === "") {
        // this is add new quiz
        console.log("run");
        dispatch(
          addAQuiz(quizzesId, quizImage, quizDescription, answers, quizTime),
        );
      } else {
        // edit a existed quiz
      }
    }

    navigation.navigate('CreateQuizzes')
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.quizDetail}>
        <Text style={styles.fieldName}>Tap to add image or video</Text>
        <TouchableOpacity>
          <Image style={styles.image} source={{uri: quizImage}}></Image>
        </TouchableOpacity>
        <Text style={styles.fieldName}>Add question</Text>
        <TextInput
          style={styles.textInput}
          value={quizDescription}
          onChangeText={text => setQuizDescription(text)}></TextInput>
        <View style={styles.answer}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeAns0}
            placeholder="+ add an answer"
            value={answers[0]}></TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeAns1}
            placeholder="+ add an answer"
            value={answers[1]}></TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeAns2}
            placeholder="+ add an answer (optional)"
            value={answers[2]}></TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeAns3}
            placeholder="+ add an answer (optional)"
            value={answers[3]}></TextInput>
        </View>
        <View style={styles.bottomButton}>
          <View style={styles.time}>
            <TextInput
              style={styles.timeInput}
              onChangeText={text => setQuizTime(text)}
              keyboardType="numeric"
              value={quizTime}></TextInput>
            <Text>S</Text>
          </View>
          <TouchableOpacity onPress={onAddOrUpdateQuiz}>
            <Image
              style={styles.acceptTest}
              source={require('../../assets/images/check.jpeg')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    fontWeight: '700',
    color: '#F28D3E',
  },
  title: {
    color: 'orange',
    fontSize: 28,
    fontWeight: '700',
  },
  quizDetail: {
    marginTop: 30,
    width: 360,
    alignItems: 'flex-start',
  },
  image: {
    width: 360,
    height: 220,
  },
  fieldName: {
    color: '#F28D3E',
    marginTop: 10,
  },
  answer: {
    marginTop: 20,
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#F28D3E',
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F28D3E',
    color: 'white',
    marginBottom: 5,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  bottomButton: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  acceptTest: {
    width: 40,
    height: 40,
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
