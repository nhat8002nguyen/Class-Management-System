import {
  QUESTION_ADD_FAIL,
  QUESTION_ADD_REQUEST,
  QUESTION_ADD_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_REMOVE_FAIL,
  QUESTION_REMOVE_REQUEST,
  QUESTION_REMOVE_SUCCESS,
  QUESTION_SAVE_FAIL,
  QUESTION_SAVE_REQUEST,
  QUESTION_SAVE_SUCCESS,
} from '../constants/questionActionConstants';

const questionListReducer = (state = {questions: []}, action) => {
  switch (action.type) {
    case QUESTION_LIST_REQUEST:
      return {...state, loading: true};
    case QUESTION_LIST_SUCCESS:
      return {loading: false, questions: action.payload};
    case QUESTION_LIST_FAIL:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

const questionAddReducer = (state = {question: {}}, action) => {
  switch (action.type) {
    case QUESTION_ADD_REQUEST:
      return {...state, loading: true};
    case QUESTION_ADD_SUCCESS:
      return {loading: false, questions: action.payload};
    case QUESTION_ADD_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

const questionRemoveReducer = (state = {question: {}}, action) => {
  switch (action.type) {
    case QUESTION_REMOVE_REQUEST:
      return {...state, loading: true};
    case QUESTION_REMOVE_SUCCESS:
      return {loading: false, question: action.payload};
    case QUESTION_REMOVE_FAIL:
      return {loading: true, error: action.payload};
    default:
      return state;
  }
};

const questionSaveReducer = (state = {question: {}}, action) => {
  switch (action.type) {
    case QUESTION_SAVE_REQUEST:
      return {...state, loading: true};
    case QUESTION_SAVE_SUCCESS:
      return {loading: false, question: action.payload};
    case QUESTION_SAVE_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export {
  questionListReducer,
  questionAddReducer,
  questionRemoveReducer,
  questionSaveReducer,
};
