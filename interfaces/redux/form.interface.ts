import { IForm, IFormField, IFormSetting } from '../form/form.interface';

export interface IFormState {
  formData: IForm;
  formSetting: IFormSetting[];
  loading: boolean;
  error: string;
}

interface IFormActionField {
  field: IFormField;
  fields: IFormField[];
}

export interface IFormAction {
  type: FORM_ACTION;
  payload: Partial<IFormState> & Partial<IFormActionField>;
}

export type FORM_ACTION =
  | 'STORE_FORM'
  | 'SET_ERROR'
  | 'STORE_SETTING'
  | 'SET_ALL_FORM_FIELDS'
  | 'SET_FORM_FIELDS'
  | 'SET_FORM_LOADING';
