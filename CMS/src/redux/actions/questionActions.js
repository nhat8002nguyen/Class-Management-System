import axios from 'axios';
import {
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_ADD_REQUEST,
  QUESTION_ADD_SUCCESS,
  QUESTION_ADD_FAIL,
  QUESTION_REMOVE_REQUEST,
  QUESTION_REMOVE_SUCCESS,
  QUESTION_REMOVE_FAIL,
  QUESTION_SAVE_REQUEST,
  QUESTION_SAVE_SUCCESS,
  QUESTION_SAVE_FAIL,
} from '../constants/questionActionConstants';

const listQuestion = _quizId => async (dispatch, getState) => {
  dispatch({type: QUESTION_LIST_REQUEST});
  const {
    userSignin: {userSignin: {token}},
  } = getState();
  try {
    const {data} = await axios.get(
      `https://cms-backend-whatever.herokuapp.com/api/staff/quizzes/${_quizId}/questions`,
      {
        headers: {token: token},
      },
    );
    let uiQuestions = data
      ? data.map(ques => ({
          questionId: ques.id,
          questionImage: ques.mediaURL,
          questionDescription: ques.description,
          answers: ques.answers,
          correctAnswer: ques.correctAnswer,
          questionTime: ques.time.toString(),
        }))
      : [];
    dispatch({type: QUESTION_LIST_SUCCESS, payload: uiQuestions});
  } catch (err) {
    dispatch({type: QUESTION_LIST_FAIL, payload: err.message});
  }
};

const addQuestion = ({
  _quizId,
  questionImage,
  questionDescription,
  answers,
  correctAnswer,
  questionTime,
}) => async (dispatch, getState) => {
  dispatch({type: QUESTION_ADD_REQUEST});
  const {
    userSignin: {userSignin: {token}},
  } = getState();
  const quesData = {
    name: questionDescription,
    description: questionDescription,
    answers: answers,
    correctAnswer: correctAnswer,
    time: parseInt(questionTime),
    mediaURL: questionImage,
  };
  try {
    const {
      data,
    } = await axios.post(
      `https://cms-backend-whatever.herokuapp.com/api/staff/quizzes/${_quizId}/questions`,
      quesData,
      {headers: {token: token}},
    );
    dispatch({type: QUESTION_ADD_SUCCESS, payload: data});
  } catch (err) {
    dispatch({type: QUESTION_ADD_FAIL, payload: err.message});
  }
};

const removeQuestion = questionId => async (dispatch, getState) => {
  dispatch({type: QUESTION_REMOVE_REQUEST});
  const {
    userSignin: {userSignin: {token}},
  } = getState();
  try {
    const {
      data,
    } = await axios.delete(
      `https://cms-backend-whatever.herokuapp.com/api/staff/questions/${questionId}`,
      {headers: {token: token}},
    );
    dispatch({type: QUESTION_REMOVE_SUCCESS, payload: data});
  } catch (err) {
    dispatch({type: QUESTION_REMOVE_FAIL, payload: err.message});
  }
};

const saveQuestion = ({
  questionId,
  questionImage,
  questionDescription,
  answers,
  correctAnswer,
  questionTime,
}) => async (dispatch, getState) => {
  dispatch({type: QUESTION_SAVE_REQUEST});
  const {
    userSignin: {userSignin: {token}},
  } = getState();
  try {
    const newUpdate = {
      name: questionDescription,
      description: questionDescription,
      mediaURL: questionImage,
      answers: answers.join(','),
      correctAnswer: correctAnswer,
      time: parseInt(questionTime),
    };
    const {
      data,
    } = await axios.put(
      `https://cms-backend-whatever.herokuapp.com/api/staff/questions/${questionId}`,
      newUpdate,
      {headers: {token: token}},
    );
    dispatch({type: QUESTION_SAVE_SUCCESS, payload: data});
  } catch (err) {
    dispatch({type: QUESTION_SAVE_FAIL, payload: err.message});
  }
};
export {listQuestion, addQuestion, removeQuestion, saveQuestion};
