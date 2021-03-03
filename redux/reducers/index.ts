import { combineReducers } from 'redux';
import { ITodoState } from '../../interfaces/redux/todo.interface';
import todo from './todo';

export interface ApplicationState {
  todoApp: ITodoState;
}

const getReducers = () => {
  return combineReducers<ApplicationState>({
    todoApp: todo,
  });
};

export default getReducers;
