import axios from 'axios';
import {
  QUESTION_ADD,
  QUESTION_LIST,
  QUESTION_REMOVE,
  QUESTION_SAVE,
} from '../constants/questionActionConstants';

const listQuestion = _quizId => async dispatch => {
  dispatch({type: QUESTION_LIST, payload: _quizId});
};

const addQuestion = ({
  questionImage,
  questionDescription,
  answers,
  questionTime,
}) => async dispatch => {
  dispatch({
    type: QUESTION_ADD,
    payload: {questionImage, questionDescription, answers, questionTime},
  });
};

const removeQuestion = questionId => async dispatch => {
  dispatch({type: QUESTION_REMOVE, payload: questionId});
};

const saveQuestion = ({
  questionId,
  questionImage,
  questionDescription,
  answers,
  questionTime,
}) => async dispatch => {
  dispatch({
    type: QUESTION_SAVE,
    payload: {
      questionId,
      questionImage,
      questionDescription,
      answers,
      questionTime,
    },
  });
};
export {listQuestion, addQuestion, removeQuestion, saveQuestion};
