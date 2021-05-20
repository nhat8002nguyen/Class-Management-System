import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {userSigninReducer, userSignupReducer} from './reducers/userReducer';
import {
  quizAddReducer,
  quizListReducer,
  quizRemoveReducer,
  quizSaveReducer,
} from './reducers/quizListReducer';
import {
  questionListReducer,
  questionAddReducer,
  questionRemoveReducer,
  questionSaveReducer,
} from './reducers/questionCreateReducer';
import {currentQuizReducer} from './reducers/currentQuizReducers';

const appReducer = combineReducers({
  // user auth reducer
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,

  // quiz reducers
  quizList: quizListReducer,
  questionList: questionListReducer,
  questionAdd: questionAddReducer,
  questionRemove: questionRemoveReducer,
  questionSave: questionSaveReducer,
  quizRemove: quizRemoveReducer,
  quizAdd: quizAddReducer,
  quizSave: quizSaveReducer,
  quizTake: currentQuizReducer,
});

const fetchedUserInfo = (async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userInfo');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    return {};
  }
})();

const initialState = {
  userSignin: {userInfo: fetchedUserInfo},
};

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
