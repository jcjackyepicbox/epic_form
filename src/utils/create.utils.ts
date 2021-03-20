import {
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
