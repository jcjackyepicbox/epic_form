export interface ITodo {
  title: string;
  id: number;
  userId: number;
  completed: boolean;
}

export interface ITodoState {
  todo: ITodo[];
  isTodoLoading: boolean;
}

export interface IAction {
  type: TODO_ACTION;
  payload: Partial<ITodoState>;
}

export type TODO_ACTION = 'STORE_TODO' | 'UPDATE_TODO_LOADING';
