import axios from 'axios';
import {
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_ADD_FAIL,
  QUIZ_ADD_REQUEST,
  QUIZ_ADD_SUCCESS,
  QUIZ_SAVE_REQUEST,
  QUIZ_SAVE_SUCCESS,
  QUIZ_SAVE_FAIL,
  QUIZ_REMOVE_REQUEST,
  QUIZ_REMOVE_SUCCESS,
  QUIZ_REMOVE_FAIL,
} from '../constants/quizActionConstants';
import QuizData from '../../data/QuizData';

const listQuiz = () => async dispatch => {
  dispatch({type: QUIZ_LIST_REQUEST});
  try {
    // get date from api
    const {data} = await axios.get(
      'https://cms-backend-whatever.herokuapp.com/api/staff/classes/d92b8c7f-afee-4700-a350-4d9c5b288040/quizzes',
    );
    const uiData = data.map(quiz => ({
      _quizId: quiz.id,
      quizName: quiz.name,
      quizDescription: quiz.description,
      quizBeginTime: new Date(quiz.start),
      quizEndTime: new Date(quiz.end),
      quizImage: quiz.mediaURL,
      quizPin: quiz.PIN,
      questions: [],
    }));
    // const data = QuizData.quizData;
    dispatch({type: QUIZ_LIST_SUCCESS, payload: uiData});
  } catch (error) {
    dispatch({type: QUIZ_LIST_FAIL, payload: error.message});
  }
};

const addQuiz = ({quizName, quizImage, quizDescription}) => async (
  dispatch,
  getState,
) => {
  // const {
  //   userSignin: {useInfo},
  // } = getState();
  dispatch({type: QUIZ_ADD_REQUEST});
  try {
    const {data} = await axios.post(
      'https://cms-backend-whatever.herokuapp.com/api/staff/classes/d92b8c7f-afee-4700-a350-4d9c5b288040/quizzes',
      {
        name: quizName,
        mediaURL: quizImage,
        description: quizDescription,
        start: Date(Date.now()),
        end: Date(Date.now()),
      },
    );
    // const data = QuizData.addQuiz(
    //   quizName,
    //   quizImage,
    //   quizDescription,
    //   questions,
    // );
    dispatch({type: QUIZ_ADD_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: QUIZ_ADD_FAIL, payload: error.message});
  }
};

const saveQuiz = ({_quizId, quizName, quizImage, quizDescription}) => async (
  dispatch,
  getState,
) => {
  dispatch({type: QUIZ_SAVE_REQUEST});
  // const {
  //   userSignin: {userInfo},
  // } = getState();
  try {
    const {data} = await axios.put(
      `https://cms-backend-whatever.herokuapp.com/api/staff/quizzes/${_quizId}`,
      {name: quizName, mediaURL: quizImage, description: quizDescription},
      // {
      //   headers: {Authorization: 'Nhat ' + userInfo.token},
      // },
    );
    // const data = QuizData.saveQuiz(
    //   _quizId,
    //   quizName,
    //   quizImage,
    //   quizDescription,
    //   questions,
    // );

    dispatch({type: QUIZ_SAVE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: QUIZ_SAVE_FAIL, payload: error.message});
  }
};

const removeQuiz = _quizId => async (dispatch, getState) => {
  dispatch({type: QUIZ_REMOVE_REQUEST});
  // const {
  //   userSignin: {userInfo},
  // } = getState();
  try {
    const {data} = await axios.delete(
      `https://cms-backend-whatever.herokuapp.com/api/staff/quizzes/${_quizId}`,
    );
    // const data = QuizData.quizData.filter(el => el._quizId === _quizId);

    // QuizData.removeQuiz(_quizId);

    dispatch({type: QUIZ_REMOVE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: QUIZ_REMOVE_FAIL, payload: error.message});
  }
};

export {listQuiz, addQuiz, removeQuiz, saveQuiz};
