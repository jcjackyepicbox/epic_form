import { IFormAction, IFormState } from '../../interfaces/redux/form.interface';

export const initialFormState: IFormState = {
  formData: null,
  loading: false,
  error: '',
};
// Use the initialState as a default value
export default function formReducer(
  state = initialFormState,
  action: IFormAction
): IFormState {
  switch (action.type) {
    case 'STORE_FORM':
      return {
        ...state,
        formData: action.payload.formData || null,
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
