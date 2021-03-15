import React from 'react';
import cx from 'classnames';
import IconButton from '../../../../components/IconButton/IconButton';
import CloseSvg from '../../../../svg/CloseSvg';
import classes from './CreateSettings.module.css';
import Input from '../../../../components/Input/Input';
import {
  IFormField,
  IFormSetting,
} from '../../../../../interfaces/form/form.interface';
import { getActiveSettings } from '../../../../utils/create.utils';
import { defaultFormSettingData } from '../../../../data/form.data';

interface IProps {
  open: boolean;
  onClose: () => void;
  activeField: IFormField | null;
  formSettings: IFormSetting[];
  updateSetting: (
    field_id: string,
    property: keyof IFormField['properties'],
    value: string | null
  ) => void;
}

function CreateSettings({
  open,
  onClose,
  formSettings,
  activeField,
  updateSetting,
}: IProps) {
  if (!open || !activeField) {
    return null;
  }

  const { type_id, properties, _id } = activeField;
  const activeSettings = getActiveSettings(formSettings, type_id) || {
    ...defaultFormSettingData,
  };

  const settingItems = Object.keys(activeSettings)
    .filter((val: keyof IFormSetting) => availableSetting[val])
    .map((val: keyof IFormField['properties']) => {
      const propertyValue = properties[val];
      const { flexDir, label } = mapFormatSettings[val];
      return (
        <div
          className={cx(classes.SettingItem, {
            [classes.DirColumn]: flexDir === 'column',
          })}
          key={val}
        >
          <div className={classes.SettingLabel}>{label}</div>
          <SettingComponent
            property={val}
            value={propertyValue}
            updateSetting={updateSetting}
            field_id={_id}
          />
        </div>
      );
    });

  return (
    <div className={classes.CreateSettings}>
      <div className={classes.SettingTitle}>
        <div>Question Settings</div>
        <IconButton customPadding="8px" onClick={onClose}>
          <CloseSvg width={8} height={8} />
        </IconButton>
      </div>
      <div className={classes.SettingPanel}>{settingItems}</div>
    </div>
  );
}

interface ISettingComponentProps {
  property: keyof IFormField['properties'];
  value: string | null;
  field_id: string;
  updateSetting: (
    field_id: string,
    property: keyof IFormField['properties'],
    value: string | null
  ) => void;
}

function SettingComponent({
  property,
  value,
  updateSetting,
  field_id,
}: ISettingComponentProps) {
  const onChangeInput = settingActionFactory(updateSetting, property, field_id);
  if (property === 'button_text') {
    return (
      <Input
        value={value || ''}
        onChange={(e) => onChangeInput(e.target.value)}
      />
    );
  }

  return (
    <button
      onClick={() => onChangeInput(value)}
      className={cx(classes.ToggleButton, {
        [classes.active]: value !== null,
      })}
    />
  );
}

function settingActionFactory(
  updateSetting: (
    field_id: string,
    property: keyof IFormField['properties'],
    value: string | null
  ) => void,
  property: keyof IFormField['properties'],
  field_id: string
) {
  switch (property) {
    case 'description':
      return (currValue: string | null) => {
        if (currValue === null) {
          updateSetting(field_id, property, '');
        } else {
          updateSetting(field_id, property, null);
        }
      };

    case 'button_text':
      return (inputValue: string) => {
        updateSetting(field_id, property, inputValue);
      };

    default:
      return () => {};
  }
}

const mapFormatSettings: Record<
  keyof IFormField['properties'],
  { label: string; flexDir: 'column' | 'row' }
> = {
  button_text: {
    label: 'Button',
    flexDir: 'column',
  },
  description: { label: 'Description', flexDir: 'row' },
};

// TODO: refactor for settings properties (later)
const availableSetting: Record<keyof IFormSetting, boolean> = {
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

export default CreateSettings;
