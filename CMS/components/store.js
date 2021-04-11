import { createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import {quizzesListReducer} from "./reducers/quizzesListReducer"; 
import quizzesData from "./data/quizData";

const reducer = combineReducers({
  quizzesList: quizzesListReducer,
});


const initialState = {
  quizzesList: quizzesData,
} 

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;