import axios from 'axios';
import {
  PRE_JOIN_QUIZ,
  PRE_JOIN_QUIZ_SUCCESSFUL,
  PRE_JOIN_QUIZ_FAILED,
  JOIN_QUIZ,
  JOIN_QUIZ_SUCCESSFUL,
  JOIN_QUIZ_FAILED,
  GET_QUESTION,
  GET_QUESTION_SUCCESSFUL,
  GET_QUESTION_FAILED,
  GET_RANK,
  SUBMIT_ANSWER_SUCCESSFUL, SUBMIT_ANSWER_FAILED, SUBMIT_ANSWER, GET_RANK_FAILED, GET_RANK_SUCCESSFUL,
} from "../constants/doQuizActionConstants";

// const BASE_URL = 'https://cms-backend-whatever.herokuapp.com/api/quizzes';
const BASE_URL = 'http://192.168.1.10:15000/api/quizzes';

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
    dispatch({ type: PRE_JOIN_QUIZ_SUCCESSFUL, payload: res.data });
  }).catch((err) => {
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
    console.log('Join quiz successfully')
    dispatch({ type: JOIN_QUIZ_SUCCESSFUL, payload: res.data });
  }).catch((err) => {
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
    // { headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5MmI4YzdmLWFmZWUtNDcwMC1hMzUwLTRkOWM1YjI4ODA0MSIsImlhdCI6MTYyMjA0MDIyNCwiZXhwIjoxNjI0NjMyMjI0fQ.dkJE8g_vJQ5jjEsWDF4yEVWNnOHomsiQOOpDa4ZkO1g' } }
    { headers: { token: token } }  ).then((res) => {
    dispatch({ type: GET_QUESTION_SUCCESSFUL, payload: res.data });
  }).catch((err) => {
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
    // { headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5MmI4YzdmLWFmZWUtNDcwMC1hMzUwLTRkOWM1YjI4ODA0MSIsImlhdCI6MTYyMjA0MDIyNCwiZXhwIjoxNjI0NjMyMjI0fQ.dkJE8g_vJQ5jjEsWDF4yEVWNnOHomsiQOOpDa4ZkO1g' } }
    { headers: { token: token } }  ).then((res) => {
    dispatch({ type: SUBMIT_ANSWER_SUCCESSFUL, payload: res.data });
  }).catch((err) => {
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
    // { headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5MmI4YzdmLWFmZWUtNDcwMC1hMzUwLTRkOWM1YjI4ODA0MSIsImlhdCI6MTYyMjA0MDIyNCwiZXhwIjoxNjI0NjMyMjI0fQ.dkJE8g_vJQ5jjEsWDF4yEVWNnOHomsiQOOpDa4ZkO1g' } }
    { headers: { token: token } }  ).then((res) => {
    dispatch({ type: GET_RANK_SUCCESSFUL, payload: res.data });
  }).catch((err) => {
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
