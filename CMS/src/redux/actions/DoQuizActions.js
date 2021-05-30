import axios from 'axios';
import {
  PRE_JOIN_QUIZ, PRE_JOIN_QUIZ_SUCCESSFUL, PRE_JOIN_QUIZ_FAILED,
  JOIN_QUIZ, JOIN_QUIZ_SUCCESSFUL, JOIN_QUIZ_FAILED,
  GET_QUESTION, GET_QUESTION_SUCCESSFUL, GET_QUESTION_FAILED,
  SUBMIT_ANSWER, SUBMIT_ANSWER_SUCCESSFUL, SUBMIT_ANSWER_FAILED,
  GET_RANK, GET_RANK_SUCCESSFUL, GET_RANK_FAILED
} from '../constants/DoQuizActionConstants';

const BASE_URL = 'https://cms-backend-whatever.herokuapp.com/api/quizzes';

const preJoinQuiz = (quizPIN) => async (dispatch, getState) => {
  dispatch({ type: PRE_JOIN_QUIZ });
  const {
    userSignin: { userSignin: { token } },
  } = getState();
  axios.post(
    `${BASE_URL}/pre-join?PIN=${quizPIN}`,
    {},
    { headers: { token: token } }
  ).then((res) => {
    console.log('Pre-join quiz successful');
    dispatch({ type: PRE_JOIN_QUIZ_SUCCESSFUL, payload: res.data });
  }).catch((err) => {
    console.log('Pre-join quiz failed, err: ' + err.response.data);
    dispatch({ type: PRE_JOIN_QUIZ_FAILED, payload: err.response.data });
  });
};

const joinQuiz = (quizID, userName) => async (dispatch, getState) => {
  dispatch({ type: JOIN_QUIZ });
  const {
    userSignin: { userSignin: { token } },
  } = getState();
  console.log('Token: ' + token);
  axios.post(
    `${BASE_URL}/${quizID}/join?userName=${userName}`,
    {},
    { headers: { token: token } }
  ).then((res) => {
    console.log('Join quiz successful');
    dispatch({ type: JOIN_QUIZ_SUCCESSFUL, payload: res.data });
  }).catch((err) => {
    console.log('Join quiz failed, err: ' + err.response.data);
    dispatch({ type: JOIN_QUIZ_FAILED, payload: err.response.data });
  });
};

const getQuestionInQuiz = (quizID, questionOrder) => async (dispatch, getState) => {
  dispatch({ type: GET_QUESTION });
  const {
    userSignin: { userSignin: { token } },
  } = getState();
  axios.get(
    `${BASE_URL}/${quizID}/questions?order=${questionOrder}`,
    { headers: { token: token } }
  ).then((res) => {
    console.log('Get question successful');
    dispatch({ type: GET_QUESTION_SUCCESSFUL, payload: res.data });
  }).catch((err) => {
    console.log('Get question failed, err:' + err.response.data);
    dispatch({ type: GET_QUESTION_FAILED, payload: err.response.data });
  });
};

const submitAnswerForQuestionInQuiz = (quizID, questionID, answer) => async (dispatch, getState) => {
  dispatch({ type: SUBMIT_ANSWER });
  const {
    userSignin: { userSignin: { token } },
  } = getState();
  axios.post(
    `${BASE_URL}/${quizID}/questions/${questionID}?answer=${answer}`,
    {},
    { headers: { token: token } }
  ).then((res) => {
    console.log('Submit answer successful');
    dispatch({ type: SUBMIT_ANSWER_SUCCESSFUL, payload: res.data });
  }).catch((err) => {
    console.log('Submit answer failed, err: ' + err.response.data);
    dispatch({ type: SUBMIT_ANSWER_FAILED, payload: err.response.data });
  });
};

const getScoreAfterQuestionInQuiz = (quizID) => async (dispatch, getState) => {
  dispatch({ type: GET_RANK });
  const {
    userSignin: { userSignin: { token } },
  } = getState();
  axios.get(
    `${BASE_URL}/${quizID}/score`,
    { headers: { token: token } }
  ).then((res) => {
    console.log('Get rank successful');
    dispatch({ type: GET_RANK_SUCCESSFUL, payload: res.data });
  }).catch((err) => {
    console.log('Get rank failed, err:' + err.response.data);
    dispatch({ type: GET_RANK_FAILED, payload: err.response.data });
  });
};

export {
  preJoinQuiz,
  joinQuiz,
  getQuestionInQuiz,
  submitAnswerForQuestionInQuiz,
  getScoreAfterQuestionInQuiz
};
