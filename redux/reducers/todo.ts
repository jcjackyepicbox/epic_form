export interface ITodo {
  title: string;
}

export interface ITodoState {
  todo: ITodo[];
}

export interface IAction {
  type: string;
  todo: ITodo[];
}

const initialState: ITodoState = {
  todo: [],
};
// Use the initialState as a default value
export default function todoReducer(state = initialState, action: IAction) {
  // The reducer normally looks at the action type field to decide what happens

  switch (action.type) {
    // Do something here based on the different types of actions
    case 'FETCH_TODO':
      return {
        ...state,
        todo: action.todo,
      };

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
