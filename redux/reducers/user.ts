import { IAction, IUserState } from '../../interfaces/redux/user.interface';

export const initialUserState: IUserState = {
  user: null,
  loading: false,
  error: '',
};
// Use the initialState as a default value
export default function userReducer(
  state = initialUserState,
  action: IAction
): IUserState {
  switch (action.type) {
    case 'STORE_USER':
      return {
        ...state,
        user: action.payload.user || null,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload.error || '',
      };

    default:
      return state;
  }
}
