import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

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

const reducer = combineReducers({
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

const store = createStore(reducer, {}, applyMiddleware(thunk));

export default store;
