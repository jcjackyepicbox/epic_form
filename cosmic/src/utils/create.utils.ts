import {
  IFormField,
  IFormSetting,
  SETTING_TYPE,
} from '../../interfaces/form/form.interface';
import { defaultFormSettingData } from '../data/form.data';

export function getActiveSettings(
  formSettings: IFormSetting[],
  type_id: SETTING_TYPE
) {
  const filteredForm = formSettings.filter((val) => val.type_id === type_id);

  if (filteredForm.length === 1) {
    return filteredForm[0];
  }

  return defaultFormSettingData;
}

export function getDraggableDisable(type_id: SETTING_TYPE) {
  if (
    type_id === SETTING_TYPE.welcome_screen ||
    type_id === SETTING_TYPE.thankyou_screen
  ) {
    return true;
  }

  return false;
}

export function getOrderNumber(
  index: number,
  type_id: SETTING_TYPE,
  existWelcomeScreen: boolean
) {
  let orderNum: number | null = index;
  if (
    type_id === SETTING_TYPE.welcome_screen ||
    type_id === SETTING_TYPE.thankyou_screen
  ) {
    orderNum = null;
  } else if (!existWelcomeScreen) {
    // as welcome screen has appear once only
    orderNum += 1;
  }

  return orderNum;
}

export function getExistingTypeId(fields: IFormField[], type_id: SETTING_TYPE) {
  const welcomeScreen = fields.filter((val) => val.type_id === type_id);

  return welcomeScreen.length > 0;
}
