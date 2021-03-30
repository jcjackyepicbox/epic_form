import {
  IChoiceForm,
  ICON_TYPE,
  IForm,
  IFormField,
  IFormSetting,
  SETTING_TYPE,
} from '../../interfaces/form/form.interface';
import { v4 as uuidv4 } from 'uuid';

export const defaultFormData: IForm = {
  _id: '',
  fields: [],
  purpose: '',
  title: '',
};

export const defaultFormSettingData: IFormSetting = {
  appear_once: false,
  button_text: false,
  description: false,
  has_answer: false,
  icon: ICON_TYPE.welcome,
  type_color: '',
  type_desc: '',
  type_id: SETTING_TYPE.welcome_screen,
  type_image: '',
  type_name: '',
};

export function getNewFormField(type_id: SETTING_TYPE): IFormField {
  return {
    _id: uuidv4(),
    properties: {
      button_text: null,
      description: null,
      choices: [],
    },
    title: '',
    type_id,
  };
}

export function getNewChoiceFormField(): IChoiceForm {
  return {
    _id: uuidv4(),
    label: '',
  };
}
