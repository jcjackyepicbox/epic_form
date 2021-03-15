import React from 'react';
import {
  IFormField,
  IFormSetting,
} from '../../../../../../interfaces/form/form.interface';
import EditableInput from '../../../../../components/EditableInput/EditableInput';
import IconButton from '../../../../../components/IconButton/IconButton';
import MoreSvg from '../../../../../svg/MoreSvg';
import SettingSvg from '../../../../../svg/SettingSvg';
import { getActiveSettings } from '../../../../../utils/create.utils';
import { mapIconCompoennt } from '../FieldDropdown/FieldDropdown';
import classes from './FieldInput.module.css';

interface IProps {
  formFieldData: IFormField;
  formSettings: IFormSetting[];
  onChange: (field_id: string, value: string) => void;
}

function FieldInput({ formFieldData, formSettings, onChange }: IProps) {
  const { _id, title, type_id } = formFieldData;
  const activeSettings = getActiveSettings(formSettings, type_id);

  if (!activeSettings) {
    return null;
  }

  const { icon, type_color } = activeSettings;
  const iconSvg = mapIconCompoennt(icon);

  function onInputChange(value: string) {
    onChange(_id, value);
  }

  return (
    <div className={classes.FieldContainer}>
      <div className={classes.FieldIconContainer}>
        <div className={classes.FieldIcon} style={{ background: type_color }}>
          {iconSvg}
          <div />
        </div>
      </div>
      <div className={classes.FieldWorkspace}>
        <EditableInput
          onChange={onInputChange}
          placeholder="Say Hi!"
          value={title}
        />
      </div>
      <div className={classes.FieldToolbar}>
        <IconButton>
          <SettingSvg width={16} height={16} />
        </IconButton>
        <IconButton>
          <MoreSvg width={16} height={16} />
        </IconButton>
      </div>
    </div>
  );
}

export default FieldInput;
