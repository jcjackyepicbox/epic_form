import { IFormAction, IFormState } from '../../interfaces/redux/form.interface';
import { defaultFormData } from '../../src/data/form.data';

export const initialFormState: IFormState = {
  formData: { ...defaultFormData },
  loading: false,
  formSetting: [],
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
        formData: action.payload.formData || { ...defaultFormData },
      };

    case 'STORE_SETTING':
      return {
        ...state,
        formSetting: action.payload.formSetting || [],
      };

    case 'SET_FORM_FIELDS':
      if (action.payload.field) {
        return {
          ...state,
          formData: {
            ...state.formData,
            fields: [...state.formData.fields, action.payload.field],
          },
        };
      }
      return { ...state };

    case 'SET_ALL_FORM_FIELDS':
      return {
        ...state,
        formData: {
          ...state.formData,
          fields: [...(action.payload.fields || [])],
        },
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
