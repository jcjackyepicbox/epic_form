export enum SETTING_TYPE {
  welcome_screen = 'welcome_screen',
  thankyou_screen = 'thankyou_screen',
  short_text = 'short_text',
}

export enum ICON_TYPE {
  welcome = 'welcome',
  thankyou = 'thankyou',
  short = 'short',
}

export interface IForm {
  _id: string;
  title: string;
  purpose: string;
  fields: IFormField[];
}

export interface IFormField {
  _id: string;
  type_id: SETTING_TYPE;
  title: string;
  properties: {
    description: string | null;
    button_text: string | null;
  };
}

export interface IFormSetting {
  type_id: SETTING_TYPE;
  type_name: string;
  type_desc: string;
  type_image: string;
  icon: ICON_TYPE;
  type_color: string;
  description: boolean;
  appear_once: boolean;
  button_text: boolean;
  has_answer: boolean;
}
