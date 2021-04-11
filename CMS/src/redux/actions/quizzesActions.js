import { v4 } from "uuid";
import c from "../constants/quizzesActionConstants";

const addQuizzes = (quizzesName, quizzesImage, description) => ({
  type: c.ADD_,
  payload: {
    
  }
});

const removeQuizzes = (_quizzesId) => ({
  type: c.REMOVE_QUIZZES,
  payload: _quizzesId
});

const addAQuiz = (quizzesId, quizImage, quizDescription, answers, quizTime) => (
  {
    type: c.ADD_QUIZ,
    payload: {
      _quizId: v4(),
      quizzesId,
      quizImage,
      quizDescription,
      answers,
      quizTime,
    }
  }
);

const removeAQuiz = (_aQuizId) => ({
  type: c.REMOVE_A_QUIZ,
  payload: {
    _aQuizId,
  }
});

export {
  addQuizzes,
  removeQuizzes,
  removeAQuiz,
  addAQuiz,
}