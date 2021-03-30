import {
  IFormField,
  IFormSetting,
} from '../../../interfaces/form/form.interface';

export const availableCreateSetting: Record<keyof IFormSetting, boolean> = {
  appear_once: false,
  button_text: true,
  description: true,
  has_answer: false,
  icon: false,
  type_color: false,
  type_desc: false,
  type_id: false,
  type_image: false,
  type_name: false,
};

export const mapFormatSettings: Record<
  Exclude<keyof IFormField['properties'], 'choices'>,
  { label: string; flexDir: 'column' | 'row' }
> = {
  button_text: {
    label: 'Button',
    flexDir: 'column',
  },
  description: { label: 'Description', flexDir: 'row' },
};
