import { IFormAction, IFormState } from '../../interfaces/redux/form.interface';
import { defaultFormData } from '../../src/data/form.data';

export const initialFormState: IFormState = {
  formData: { ...defaultFormData },
  loading: false,
  formSetting: [],
  formResponse: [],
  formResponseByField: {},
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
        loading: action.payload.loading || false,
        formResponse: action.payload.formResponse || [],
        formSetting: action.payload.formSetting || [],
        formResponseByField: action.payload.formResponseByField || {},
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

    case 'SET_FORM_LOADING':
      return {
        ...state,
        loading: action.payload.loading || false,
      };

    default:
      return state;
  }
}
