import { IAction, ITodo } from '../../interfaces/redux/todo.interface';
import { getHomeData } from '../../src/service/common.service';

export function storeTodo(todo: ITodo[]): IAction {
  return {
    type: 'STORE_TODO',
    payload: {
      todo: todo,
    },
  };
}

export function updateTodoLoading(loading: boolean): IAction {
  return {
    type: 'UPDATE_TODO_LOADING',
    payload: {
      isTodoLoading: loading,
    },
  };
}

export function getTodoList() {
  return async (dispatch: any) => {
    dispatch(updateTodoLoading(true));
    const serviceData = await getHomeData();
    if (serviceData.status) {
      dispatch(storeTodo(serviceData.data));
    }
    dispatch(updateTodoLoading(false));
  };
}
