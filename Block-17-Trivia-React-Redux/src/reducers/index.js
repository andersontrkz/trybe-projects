import { combineReducers } from 'redux';
import player from './player';
import questions from './questions';

const rootReducer = combineReducers({ player, questions });

export default rootReducer;
