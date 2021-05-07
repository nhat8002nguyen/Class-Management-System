import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers(() => 'hello');

const store = createStore(reducer, {}, applyMiddleware(thunk));

export default store;
