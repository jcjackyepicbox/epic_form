// @flow
import { combineReducers } from 'redux';
import todo from './todo';

const getReducers = () => {
  return combineReducers({
    todo,
  });
};

export default getReducers;
