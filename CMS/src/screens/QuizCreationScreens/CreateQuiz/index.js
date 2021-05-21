import React, {useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import QuestionCard from '../../../components/molecules/QuestionCard';
import {listQuestion} from '../../../redux/actions/questionActions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from './styles';
import {addQuiz, listQuiz, saveQuiz} from '../../../redux/actions/quizActions';
import {theme} from '../../../styles/theme';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const CreateQuiz = ({route, navigation}) => {
  const _quizId = route.params ? route.params.quizId : '';
  const quizList = useSelector(state => state.quizList);
  const {quizzes} = quizList;
  const quiz = quizzes?.find(quiz => quiz._quizId === _quizId);
  const [refreshing, setRefreshing] = useState(false);

  const [quizName, setQuizName] = useState(
    quiz !== undefined ? quiz.quizName : '',
  );
  const [quizImage, setQuizImage] = useState(
    quiz !== undefined ? quiz.quizImage : '',
  );
  const [quizDescription, setQuestionDescripition] = useState(
    quiz !== undefined ? quiz.quizDescription : '',
  );

  const dispatch = useDispatch();

  const {loading, questions, error} = useSelector(state => state.questionList);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () =>
        _quizId !== '' ? (
          <Text style={styles.headerTitle}>Edit Quiz</Text>
        ) : (
          <Text style={styles.headerTitle}>Create Quiz</Text>
        ),
    });
    dispatch(listQuestion(_quizId));
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(listQuestion(_quizId));
    wait(1000).then(() => setRefreshing(false));
  }, []);

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

    launchImageLibrary(options, async res => {
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
        setQuizImage(source);
      }
    });
  };
  const openAddQuestion = () => {
    navigation.navigate('CreateQuestion', {_quizId: _quizId});
  };

  const onConfirmQuiz = () => {
    // Save content of quiz to database like update or add new quiz
    if (_quizId) {
      dispatch(saveQuiz({_quizId, quizName, quizImage, quizDescription}));
    } else {
      dispatch(addQuiz({quizName, quizImage, quizDescription}));
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.testDetail}>
        <Text style={styles.fieldName}>Tap to add image</Text>
        <View style={[styles.bigImage, styles.input]}>
          <TouchableOpacity onPress={() => pickImage()}>
            <Image
              style={styles.image}
              source={
                quizImage
                  ? {uri: quizImage}
                  : require('../../../assets/images/NoImage.jpg')
              }></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.fieldName}>Subject</Text>
        <TextInput
          style={[styles.input, styles.inputText]}
          value={quizName}
          onChangeText={text => setQuizName(text)}></TextInput>
        <Text style={styles.fieldName}>Description</Text>
        <TextInput
          style={[styles.input, styles.inputText]}
          value={quizDescription}
          onChangeText={text => setQuestionDescripition(text)}></TextInput>
      </View>
      <View style={styles.viewQuestions}>
        <Text style={styles.fieldName}>
          Questions({questions && questions.length})
        </Text>
        <ScrollView
          contentContainerStyle={styles.questions}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : error ? (
            <Text>you need to confirm quiz first !</Text>
          ) : (
            questions.map((question, index) => (
              <QuestionCard
                key={question.questionId}
                {...question}
                _quizId={_quizId}
                ordNum={index + 1}
                navigation={navigation}
              />
            ))
          )}
        </ScrollView>
      </View>
      <View style={styles.bottomButton}>
        <TouchableNativeFeedback onPress={openAddQuestion}>
          <View style={styles.buttonAdd}>
            <Text>Add Quiz</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableOpacity onPress={onConfirmQuiz}>
          <Icon
            name="checkcircle"
            size={40}
            color="orange"
            style={styles.acceptTest}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateQuiz;
