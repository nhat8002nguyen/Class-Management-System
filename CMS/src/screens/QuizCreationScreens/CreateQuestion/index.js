import React, {useState, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import {
  addQuestion,
  listQuestion,
  saveQuestion,
} from '../../../redux/actions/questionActions';
import styles from './styles';
import {RadioButton} from 'react-native-paper';

const CreateQuestion = ({navigation, route}) => {
  const isAddNewQuiz = Object.keys(route.params).length <= 1 ? true : false;
  const _quizId = route.params._quizId;
  const questionId = isAddNewQuiz ? '' : route.params.questionId;
  const [questionImage, setQuestionImage] = useState(
    isAddNewQuiz
      ? 'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg'
      : route.params.questionImage,
  );
  const [questionDescription, setQuestionDescription] = useState(
    isAddNewQuiz ? '' : route.params.questionDescription,
  );
  const [answers, setAnswers] = useState(
    isAddNewQuiz ? ['A ', 'B ', 'C ', 'D '] : route.params.answers,
  );
  const [correctAnswer, setCorrectAnswer] = useState(
    isAddNewQuiz ? 1 : route.params.correctAnswer,
  );
  const [questionTime, setQuestionTime] = useState(
    isAddNewQuiz ? '' : route.params.questionTime,
  );

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.headerTitle}>
          {route.params.questionId !== null
            ? 'Edit Question'
            : 'Create A Question'}
        </Text>
      ),
    });
  }, [navigation]);

  /* A question can be created with description, at least 2 answers A,B and questionTime. 
    Image and 2 last answers are optional
  */

  const pickImage = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, async res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = res.uri;
        setQuestionImage(source);
      }
    });
  };

  const onChangeAns0 = text => {
    setAnswers(pAnswers => pAnswers.map((a, i) => (a = i == 0 ? text : a)));
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

  const onAddOrUpdateQuestion = async () => {
    if (
      questionDescription === '' ||
      answers[0] === '' ||
      answers[1] === '' ||
      questionTime === ''
    ) {
      alert('Wrong to edit or create question');
    } else {
      if (questionId === '') {
        // this is add new question
        await dispatch(
          addQuestion({
            _quizId,
            questionImage,
            questionDescription,
            answers,
            correctAnswer,
            questionTime,
          }),
        );
      } else {
        // edit a existed question
        await dispatch(
          saveQuestion({
            questionId,
            questionImage,
            questionDescription,
            answers,
            correctAnswer,
            questionTime,
          }),
        );
      }

      dispatch(listQuestion(_quizId));
    }

    navigation.navigate('CreateQuiz');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.quizDetail}>
        <Text style={styles.fieldName}>Tap to add image or video</Text>
        <TouchableOpacity onPress={() => pickImage()}>
          <Image style={styles.image} source={{uri: questionImage}}></Image>
        </TouchableOpacity>
        <Text style={styles.fieldName}>Add question</Text>
        <TextInput
          style={styles.textInput}
          value={questionDescription}
          onChangeText={text => setQuestionDescription(text)}></TextInput>
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
              onChangeText={text => setQuestionTime(text)}
              keyboardType="numeric"
              value={questionTime}></TextInput>
            <Text>S</Text>
          </View>
          <View style={styles.radioBtnGroup}>
            <Text>A</Text>
            <RadioButton
              value={1}
              status={correctAnswer === 1 ? 'checked' : 'unchecked'}
              onPress={() => setCorrectAnswer(1)}
            />
            <Text>B</Text>
            <RadioButton
              value={2}
              status={correctAnswer === 2 ? 'checked' : 'unchecked'}
              onPress={() => setCorrectAnswer(2)}
            />
            <Text>C</Text>
            <RadioButton
              value={3}
              status={correctAnswer === 3 ? 'checked' : 'unchecked'}
              onPress={() => setCorrectAnswer(3)}
            />
            <Text>D</Text>
            <RadioButton
              value={4}
              status={correctAnswer === 4 ? 'checked' : 'unchecked'}
              onPress={() => setCorrectAnswer(4)}
            />
          </View>
          <TouchableOpacity onPress={onAddOrUpdateQuestion}>
            <Icon
              name="checkcircle"
              size={40}
              color="orange"
              style={styles.acceptTest}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateQuestion;
