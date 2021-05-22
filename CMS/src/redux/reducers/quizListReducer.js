import {v4} from 'uuid';
import {
  QUIZ_SAVE_REQUEST,
  QUIZ_SAVE_SUCCESS,
  QUIZ_SAVE_FAIL,
  QUIZ_REMOVE_FAIL,
  QUIZ_REMOVE_SUCCESS,
  QUIZ_REMOVE_REQUEST,
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_ADD_REQUEST,
  QUIZ_ADD_SUCCESS,
  QUIZ_ADD_FAIL,
} from '../constants/quizActionConstants';

const quizListReducer = (state = {quizzes: []}, action) => {
  switch (action.type) {
    case QUIZ_LIST_REQUEST:
      return {...state, loading: true};
    case QUIZ_LIST_SUCCESS:
      return {
        loading: false,
        quizzes: action.payload,
      };
    case QUIZ_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

const quizAddReducer = (state = {quiz: {}}, action) => {
  switch (action.type) {
    case QUIZ_ADD_REQUEST:
      return {loading: true, error: false};
    case QUIZ_ADD_SUCCESS:
      return {loading: false, quiz: action.payload, success: true};
    case QUIZ_ADD_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

const quizSaveReducer = (state = {quiz: {}}, action) => {
  switch (action.type) {
    case QUIZ_SAVE_REQUEST:
      return {loading: true, error: false};
    case QUIZ_SAVE_SUCCESS:
      return {loading: false, quiz: action.payload, success: true};
    case QUIZ_SAVE_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

const quizRemoveReducer = (state = {quiz: {}}, action) => {
  switch (action.type) {
    case QUIZ_REMOVE_REQUEST:
      return {loading: true};
    case QUIZ_REMOVE_SUCCESS:
      return {loading: false, quiz: action.payload, success: true};
    case QUIZ_REMOVE_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export {quizListReducer, quizAddReducer, quizSaveReducer, quizRemoveReducer};
