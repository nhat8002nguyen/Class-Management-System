import {
  PRE_JOIN_QUIZ_FAILED,
  PRE_JOIN_QUIZ_SUCCESSFUL,
  PRE_JOIN_QUIZ,
  SAVE_DATA_FOR_JOIN_QUIZ,
  JOIN_QUIZ,
  JOIN_QUIZ_SUCCESSFUL,
  JOIN_QUIZ_FAILED,
  SAVE_DATA_FOR_GET_QUESTION,
  GET_QUESTION,
  GET_QUESTION_SUCCESSFUL,
  GET_QUESTION_FAILED,
  SUBMIT_ANSWER,
  SUBMIT_ANSWER_SUCCESSFUL,
  SUBMIT_ANSWER_FAILED,
  SAVE_DATA_FOR_GET_RANK,
  GET_RANK,
  GET_RANK_SUCCESSFUL,
  GET_RANK_FAILED
} from '../constants/doQuizActionConstants';

let defaultState = {
  loading: false,
  questionOrder: 0,
  userName: '',
  userScore: 0,
  userRank: 0,
  quizInfo: undefined,
  fetchQuizInfoSuccess: false,
  questionInfo: undefined,
  fetchQuestionInfoSuccess: false,
  top5: [],
  fetchRankInfoSuccess: false,
  fetchErr: false,
  fetchErrMsg: '',
  success: false,
  err: false,
  errMsg: ''
}

const preJoinQuizReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PRE_JOIN_QUIZ:
      return { ...state, loading: true }
    case PRE_JOIN_QUIZ_SUCCESSFUL:
      console.log('Quiz info: ' + JSON.stringify(action.payload));
      return { ...state, loading: false, fetchQuizInfoSuccess: true, quizInfo: action.payload }
    case PRE_JOIN_QUIZ_FAILED:
      return { ...state, loading: false, fetchErr: true, fetchErrMsg: action.payload }
    default:
      return state;
  }
};

const joinQuizReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_DATA_FOR_JOIN_QUIZ:
      return { ...state, fetchErr: false, quizInfo: action.payload.quizInfo }
    case JOIN_QUIZ:
      return { ...state, loading: true }
    case JOIN_QUIZ_SUCCESSFUL:
      return { ...state, loading: false, success: true, questionOrder: action.payload.questionOrder, userScore: action.payload.userScore }
    case JOIN_QUIZ_FAILED:
      return { ...state, loading: false, err: true, errMsg: action.payload }
    default:
      return state;
  }
}

const answerQuestionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_DATA_FOR_GET_QUESTION:
      console.log('Question order: ' + action.payload.questionOrder);
      return { ...state, success: false, questionOrder: action.payload.questionOrder, userName: action.payload.userName, userScore: action.payload.userScore, quizInfo: action.payload.quizInfo }
    case GET_QUESTION:
      return { ...state, loading: true }
    case GET_QUESTION_SUCCESSFUL:
      console.log('Question info: ' + JSON.stringify(action.payload));
      return { ...state, loading: false, fetchQuestionInfoSuccess: true, questionInfo: action.payload }
    case GET_QUESTION_FAILED:
      return { ...state, loading: false, fetchErr: true, fetchErrMsg: action.payload };
    case SUBMIT_ANSWER:
      return { ...state, loading: true }
    case SUBMIT_ANSWER_SUCCESSFUL:
      return { ...state, loading: false, success: true }
    case SUBMIT_ANSWER_FAILED:
      return { ...state, loading: false, err: true, errMsg: action.payload }
    default:
      return state;
  }
}

const getRankReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_DATA_FOR_GET_RANK:
      return { ...state, questionOrder: action.payload.questionOrder, userName: action.payload.userName, quizInfo: action.payload.quizInfo }
    case GET_RANK:
      return { ...state, loading: true }
    case GET_RANK_SUCCESSFUL:
      return { ...state, loading: false, fetchRankInfoSuccess: true, top5: action.payload.top5, userScore: action.payload.userScore, userRank: action.payload.userRank }
    case GET_RANK_FAILED:
      return { ...state, loading: false, fetchErr: true, fetchErrMsg: action.payload }
    default:
      return state
  }
}

export {
  preJoinQuizReducer,
  joinQuizReducer,
  answerQuestionReducer,
  getRankReducer
}
