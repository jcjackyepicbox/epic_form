import { ANSWER_TYPE } from '@epic-form/divine/dist/types/helpers/preview.types';
import {
  IForm,
  IFormField,
  IFormSetting,
  SETTING_TYPE,
} from '../form/form.interface';

export interface IFormState {
  formData: IForm;
  formSetting: IFormSetting[];
  formResponse: IFormResponse[];
  formResponseByField: Record<string, IFieldAnswer[]>;
  loading: boolean;
  error: string;
}

export interface IFormResponse {
  _id: string;
  form_id: string;
  start_time: number;
  end_time: number;
  answer: IFieldAnswer[];
}

export interface IFieldAnswer {
  field_id: string;
  field_type: SETTING_TYPE;
  answer_type: ANSWER_TYPE;
  choices: IChoiceAnswer | null;
  text: string | null;
  number: number | null;
  boolean: number | null;
}

export interface IChoiceAnswer {
  choice_id: string;
  text: string;
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
  | 'SET_ALL_FORM_FIELDS'
  | 'SET_FORM_FIELDS'
  | 'SET_FORM_LOADING';
