import { v4 } from "uuid";
import c from "../constants/quizzesActionConstants";

const quizzesListReducer = (state = [], action) => {
  switch (action.type) {
    case c.ADD_QUIZZES:
      return [...state, action.payload];
    case c.REMOVE_QUIZZES:
      return state.filter(quizzes => quizzes._quizzesId != action.payload);
    case c.ADD_QUIZ:
      const newState = [...state];
      let idQuizzesExist = null;
      
      // if quizzes was not yet created, add a temporary quizzes to add new quiz
      if (action.payload.quizzesId === "") {
        newState.push({
          _quizzesId: v4(), 
          quizzes: [],
        });
        idQuizzesExist = newState.length - 1;
      } else {
        for (let i=0; i<newState.length; i++) {
          if (action.payload.quizzesId === newState[i]._quizzesId) {
            idQuizzesExist = i;
            break;
          } 
        }
      }

      console.log(idQuizzesExist);

      const newQuiz = {
        _quizId: action.payload._quizId,
        quizNum: newState[idQuizzesExist].quizzes.length+1,
        quizImage: action.payload.quizImage,
        quizDescription: action.payload.quizDescription,
        answers: action.payload.answers,
        quizTime: action.payload.quizTime,
      };

      newState[idQuizzesExist].quizzes.push(newQuiz);
      console.log(newState);

      return newState;

    default:
      return state;
  }
}

export {
  quizzesListReducer
}