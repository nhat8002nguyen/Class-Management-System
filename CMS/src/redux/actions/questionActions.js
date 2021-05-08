import axios from 'axios';
import {
  QUESTION_ADD,
  QUESTION_LIST,
  QUESTION_REMOVE,
  QUESTION_SAVE,
} from '../constants/questionActionConstants';

const listQuestion = _quizId => async dispatch => {
  const {data} = await axios.get(
    `https://cms-backend-whatever.herokuapp.com/api/staff/quizzes/${_quizId}/questions`,
  );
  // const data = QuizData.quizData.find(quiz => quiz._quizId === _quizId);
  let uiQuestions = data
    ? data.map(ques => ({
        questionId: ques.id,
        questionImage: ques.mediaURL,
        questionDescription: ques.description,
        answers: ['A 123', 'B 456', 'C 456', 'D 789'],
        questionTime: ques.time,
      }))
    : [];
  console.log('here run', uiQuestions);
  dispatch({type: QUESTION_LIST, payload: uiQuestions});
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
