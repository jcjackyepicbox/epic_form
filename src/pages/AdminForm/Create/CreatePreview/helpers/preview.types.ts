import { SETTING_TYPE } from '../../../../../../interfaces/form/form.interface';
import { Preview } from './preview.model';

export enum ANSWER_TYPE {
  number = 'number',
  text = 'text',
  choices = 'choices',
  boolean = 'boolean',
  none = 'none',
}

export interface IFieldAnswer {
  field_id: string;
  field_type: SETTING_TYPE;
  answer_type: ANSWER_TYPE;
  choices: { choice_id: string; text: string } | null;
  text: string | null;
  number: string | null;
  boolean: boolean | null;
}

export interface IFormAnswer {
  start_time: number;
  answer: IFieldAnswer[];
}

export interface IPreviewState {
  answerData: IFormAnswer;
  previewData: Preview;
}
