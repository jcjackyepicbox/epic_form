import { combineReducers } from 'redux';
import todo, { ITodoState } from './todo';

export interface ApplicationState {
  todo: ITodoState;
}

const getReducers = () => {
  return combineReducers<ApplicationState>({
    todo,
  });
};

export default getReducers;
