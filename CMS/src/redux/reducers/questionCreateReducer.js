import axios from 'axios';
import {
  QUESTION_ADD,
  QUESTION_LIST,
  QUESTION_REMOVE,
  QUESTION_SAVE,
} from '../constants/questionActionConstants';
import QuizData from '../../data/QuizData';

const questionCreateReducers = (state = {questions: []}, action) => {
  switch (action.type) {
    case QUESTION_LIST:
      const questions = action.payload ? action.payload : [];
      return {questions};
    case QUESTION_ADD:
      const questionId = state.questions.length + 1;
      return {
        questions: [...state.questions, {...action.payload, questionId}],
      };
    case QUESTION_REMOVE:
      return {
        questions: [...state.questions].filter(
          (question, index) => question.questionId != action.payload,
        ),
      };
    case QUESTION_SAVE:
      const newUpdate = action.payload;
      return {
        questions: [...state.questions].map(question =>
          question.questionId === action.payload.questionId
            ? {...question, ...newUpdate}
            : question,
        ),
      };
    default:
      return state;
  }
};

export default questionCreateReducers;
