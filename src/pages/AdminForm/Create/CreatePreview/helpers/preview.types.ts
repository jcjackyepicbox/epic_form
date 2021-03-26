import { SETTING_TYPE } from '../../../../../../interfaces/form/form.interface';
import { Preview } from './preview.model';

export enum ANSWER_TYPE {
  number = 'number',
  text = 'text',
  choices = 'choices',
  boolean = 'boolean',
  none = 'none',
}

export interface IChoiceAnswer {
  choice_id: string;
  text: string;
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

export interface IFormAnswer {
  start_time: number;
}

export interface IPreviewState {
  answerData: IFormAnswer;
  previewData: Preview;
}
