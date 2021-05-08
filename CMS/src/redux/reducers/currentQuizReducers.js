import {
  QUIZ_TAKE_FAILURE,
  QUIZ_TAKE_SUCCESS,
  QUIZ_TAKE_REQUEST,
} from '../constants/currentQuizActionConstants';

const currentQuizReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_TAKE_REQUEST:
      return {loading: true};
    case QUIZ_TAKE_SUCCESS:
      return {
        loading: false,
        error: false,
        quiz: action.payload,
        success: true,
      };
    case QUIZ_TAKE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export {currentQuizReducer};
