import { IAction, ITodoState } from '../../interfaces/redux/todo.interface';

export const initialTodoState: ITodoState = {
  todo: [],
  isTodoLoading: false,
};
// Use the initialState as a default value
export default function todoReducer(
  state = initialTodoState,
  action: IAction
): ITodoState {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case 'STORE_TODO':
      return {
        ...state,
        todo: action.payload.todo || [],
      };
    case 'UPDATE_TODO_LOADING':
      return {
        ...state,
        isTodoLoading:
          action.payload.isTodoLoading || initialTodoState.isTodoLoading,
      };

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
