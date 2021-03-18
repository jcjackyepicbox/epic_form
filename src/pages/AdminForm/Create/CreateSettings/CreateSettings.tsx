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
import {
  availableCreateSetting,
  mapFormatSettings,
} from '../../../../constants/create/create.setting';
import { mapIconCompoennt } from '../CreateField/FieldDropdown/FieldDropdown';
import { updateFieldProperties } from '../../../../../redux/actions/form.action';
import { useDispatch } from 'react-redux';

interface IProps {
  open: boolean;
  onClose: () => void;
  activeField: IFormField | null;
  formSettings: IFormSetting[];
}

function CreateSettings({ open, onClose, formSettings, activeField }: IProps) {
  if (!open || !activeField) {
    return null;
  }

  const dispatch = useDispatch();
  const { type_id, properties, _id } = activeField;
  const activeSettings = getActiveSettings(formSettings, type_id) || {
    ...defaultFormSettingData,
  };

  function updateSettingProperty(
    field_id: string,
    property: keyof IFormField['properties'],
    value: string | null
  ) {
    dispatch(updateFieldProperties(field_id, property, value));
  }

  const settingItems = Object.keys(activeSettings)
    .filter((val: keyof IFormSetting) => availableCreateSetting[val])
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
            updateSetting={updateSettingProperty}
            field_id={_id}
          />
        </div>
      );
    });

  const iconFieldComponent = mapIconCompoennt(activeSettings.icon);

  return (
    <div className={classes.CreateSettings}>
      <div className={classes.SettingTitle}>
        <div>Question Settings</div>
        <IconButton customPadding="8px" onClick={onClose}>
          <CloseSvg width={8} height={8} />
        </IconButton>
      </div>
      <div className={classes.SettingPanel}>
        <div className={cx(classes.SettingItem, classes.DirColumn)}>
          <div className={classes.SettingLabel}>Question Type</div>

          <div className={classes.SettingIconContainer}>
            <div
              className={classes.SettingFieldIcon}
              style={{ backgroundColor: activeSettings.type_color }}
            >
              {iconFieldComponent}
            </div>
            <div className={classes.SettingStatement}>
              {activeSettings.type_name}
            </div>
          </div>
        </div>
        {settingItems}
      </div>
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

export default CreateSettings;
