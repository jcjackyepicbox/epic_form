import { IForm } from '../form/form.interface';

export interface IFormState {
  formData: IForm | null;
  loading: boolean;
  error: string;
}

export interface IFormAction {
  type: FORM_ACTION;
  payload: Partial<IFormState>;
}

export type FORM_ACTION = 'STORE_FORM' | 'SET_ERROR';
