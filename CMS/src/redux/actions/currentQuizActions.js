import axios from 'axios';
import {
  QUIZ_TAKE_FAILURE,
  QUIZ_TAKE_SUCCESS,
  QUIZ_TAKE_REQUEST,
} from '../constants/currentQuizActionConstants';
import QuizData from '../../data/QuizData';

const takeCurrentQuiz = quizPin => async (dispatch, getState) => {
  dispatch({type: QUIZ_TAKE_REQUEST});
  // const {
  //   userSignin: {userInfo},
  // } = getState();
  try {
    // const {data} = await  axios.get("api/quiz/"+quizPin);
    const data = QuizData.takeQuizWithPin(quizPin);
    dispatch({type: QUIZ_TAKE_SUCCESS, payload: data});
  } catch (e) {
    dispatch({type: QUIZ_TAKE_FAILURE, payload: e.message});
  }
};

export {takeCurrentQuiz};
