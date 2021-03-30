import {
  IGenericAction,
  IGenericState,
} from '../../interfaces/redux/generic.interface';

export const initialGenericState: IGenericState = {
  type: '',
  message: '',
};

// Use the initialState as a default value
export default function genericReducer(
  state = initialGenericState,
  action: IGenericAction
): IGenericState {
  switch (action.type) {
    case 'SET_GENERIC_MSG':
      return {
        ...state,
        message: action.payload.message || '',
        type: action.payload.type || '',
      };

    default:
      return state;
  }
}
