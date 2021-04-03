import { SETTING_TYPE } from '../interfaces/index.interface';
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
export interface IPreviewState {
  start_time: number;
  unanswered_data: Set<string>;
  previewData: Preview;
  phaseType: PREVIEW_PHASE;
}

export enum PREVIEW_PHASE {
  'start' = 'start',
  'content' = 'content',
  'end' = 'end',
}

export interface IResponseApi {
  status: boolean;
  data?: {
    status: boolean;
    message: string;
  };
  error?: string;
}
