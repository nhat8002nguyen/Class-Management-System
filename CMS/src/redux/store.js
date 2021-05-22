import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {
  quizAddReducer,
  quizListReducer,
  quizRemoveReducer,
  quizSaveReducer,
} from './reducers/quizListReducer';
import exercise from './reducers/exerciseReducer'
import questionCreateReducers from './reducers/questionCreateReducer';
import {currentQuizReducer} from './reducers/currentQuizReducers';

const reducer = combineReducers({
  quizList: quizListReducer,
  questions: questionCreateReducers,
  quizRemove: quizRemoveReducer,
  quizAdd: quizAddReducer,
  quizSave: quizSaveReducer,
  quizTake: currentQuizReducer,
  exercise
});

const store = createStore(reducer, {}, applyMiddleware(thunk));

export default store;
