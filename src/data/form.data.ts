import {
  IForm,
  IFormField,
  SETTING_TYPE,
} from '../../interfaces/form/form.interface';
import { v4 as uuidv4 } from 'uuid';

export const defaultFormData: IForm = {
  _id: '',
  fields: [],
  purpose: '',
  title: '',
};

export function getNewFormField(type_id: SETTING_TYPE): IFormField {
  return {
    _id: uuidv4(),
    properties: {
      button_text: null,
      description: null,
    },
    title: '',
    type_id,
  };
}
