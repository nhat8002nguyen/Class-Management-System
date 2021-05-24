import axios from 'axios';
import {
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_ADD_FAIL,
  QUIZ_ADD_REQUEST,
  QUIZ_ADD_SUCCESS,
  QUIZ_SAVE_REQUEST,
  QUIZ_SAVE_SUCCESS,
  QUIZ_SAVE_FAIL,
  QUIZ_REMOVE_REQUEST,
  QUIZ_REMOVE_SUCCESS,
  QUIZ_REMOVE_FAIL,
} from '../constants/quizActionConstants';

const listQuiz = () => async (dispatch, getState) => {
  dispatch({type: QUIZ_LIST_REQUEST});
  const {
    userSignin: {
      userSignin: {token},
    },
  } = getState();
  try {
    // get date from api
    const {data} = await axios.get(
      'https://cms-backend-whatever.herokuapp.com/api/staff/classes/d92b8c7f-afee-4700-a350-4d9c5b288040/quizzes',
      {
        headers: {
          token: token,
        },
      },
    );
    const uiData = data.map(quiz => ({
      _quizId: quiz.id,
      quizName: quiz.name,
      quizDescription: quiz.description,
      quizBeginTime: new Date(quiz.start),
      quizEndTime: new Date(quiz.end),
      quizImage: quiz.mediaURL,
      quizPin: quiz.PIN,
      questions: [],
    }));
    // const data = QuizData.quizData;
    dispatch({type: QUIZ_LIST_SUCCESS, payload: uiData});
  } catch (error) {
    dispatch({type: QUIZ_LIST_FAIL, payload: error.message});
  }
};

const addQuiz = ({quizName, quizImage, quizDescription}) => async (
  dispatch,
  getState,
) => {
  const {
    userSignin: {
      userSignin: {token},
    },
  } = getState();
  dispatch({type: QUIZ_ADD_REQUEST});

  try {
    const {data} = await axios.post(
      'https://cms-backend-whatever.herokuapp.com/api/staff/classes/d92b8c7f-afee-4700-a350-4d9c5b288040/quizzes',
      {
        name: quizName,
        mediaURL: quizImage,
        description: quizDescription,
        start: Date(Date.now()),
        end: Date(Date.now()),
      },
      {
        headers: {
          token: token,
        },
      },
    );
    dispatch({type: QUIZ_ADD_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: QUIZ_ADD_FAIL, payload: error.message});
  }
};

const saveQuiz = ({
  _quizId,
  quizName,
  quizImage,
  quizDescription,
  end,
}) => async (dispatch, getState) => {
  dispatch({type: QUIZ_SAVE_REQUEST});
  const {
    userSignin: {
      userSignin: {token},
    },
  } = getState();
  try {
    let newUpdate;
    if (end) {
      newUpdate = {end: end};
    } else {
      newUpdate = {
        name: quizName,
        mediaURL: quizImage,
        description: quizDescription,
      };
    }
    const {data} = await axios.put(
      `https://cms-backend-whatever.herokuapp.com/api/staff/quizzes/${_quizId}`,
      newUpdate,
      {
        headers: {token: token},
      },
    );

    dispatch({type: QUIZ_SAVE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: QUIZ_SAVE_FAIL, payload: error.message});
  }
};

const removeQuiz = _quizId => async (dispatch, getState) => {
  dispatch({type: QUIZ_REMOVE_REQUEST});
  const {
    userSignin: {
      userSignin: {token},
    },
  } = getState();
  try {
    const {data} = await axios.delete(
      `https://cms-backend-whatever.herokuapp.com/api/staff/quizzes/${_quizId}`,
      {
        headers: {token: token},
      },
    );

    dispatch({type: QUIZ_REMOVE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: QUIZ_REMOVE_FAIL, payload: error.message});
  }
};

export {listQuiz, addQuiz, removeQuiz, saveQuiz};