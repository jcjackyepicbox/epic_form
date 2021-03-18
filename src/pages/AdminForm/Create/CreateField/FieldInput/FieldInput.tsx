import React, { useState } from 'react';
import {
  IFormField,
  IFormSetting,
} from '../../../../../../interfaces/form/form.interface';
import Dropdown from '../../../../../components/Dropdown/Dropdown';
import EditableInput from '../../../../../components/EditableInput/EditableInput';
import IconButton from '../../../../../components/IconButton/IconButton';
import { mapPlaceholderField } from '../../../../../constants/create/create.constant';
import MoreSvg from '../../../../../svg/MoreSvg';
import SettingSvg from '../../../../../svg/SettingSvg';
import { getActiveSettings } from '../../../../../utils/create.utils';
import { mapIconCompoennt } from '../FieldDropdown/FieldDropdown';
import classes from './FieldInput.module.css';

interface IProps {
  active: boolean;
  formFieldData: IFormField;
  formSettings: IFormSetting[];
  onChange: (field_id: string, value: string) => void;
  onSetActiveField: (field_id: string) => void;
  onUpdateDescription: (field_id: string, value: string) => void;
  onDeleteField: (field_id: string) => void;
}

function FieldInput({
  formFieldData,
  formSettings,
  onChange,
  onSetActiveField,
  onUpdateDescription,
  active,
  onDeleteField,
}: IProps) {
  const [hoverActive, setHoverActive] = useState<boolean>(false);
  const [ddlActive, setDdlActive] = useState<boolean>(false);

  const {
    _id,
    title,
    type_id,
    properties: { description },
  } = formFieldData;
  const activeSettings = getActiveSettings(formSettings, type_id);

  if (!activeSettings) {
    return null;
  }

  const { icon, type_color } = activeSettings;
  const placeholder = mapPlaceholderField[type_id];
  const iconSvg = mapIconCompoennt(icon);

  function onInputChange(value: string) {
    onChange(_id, value);
  }

  function onUpdateDesc(value: string) {
    onUpdateDescription(_id, value);
  }

  function setActiveField() {
    onSetActiveField(_id);
  }

  function onLeaveField() {
    setHoverActive(false);
    setDdlActive(false);
  }

  function toggleDdl() {
    if (ddlActive) {
      setDdlActive(false);
    } else {
      setDdlActive(true);
    }
  }

  function onDeleteFieldClick() {
    onDeleteField(_id);
    if (active) {
      onSetActiveField('');
    }
  }

  return (
    <div
      className={classes.FieldContainer}
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={onLeaveField}
    >
      <div className={classes.FieldIconContainer} onClick={setActiveField}>
        <div className={classes.FieldIcon} style={{ background: type_color }}>
          {iconSvg}
          <div />
        </div>
      </div>
      <div className={classes.FieldWorkspace} onClick={setActiveField}>
        <EditableInput
          onChange={onInputChange}
          placeholder={placeholder}
          value={title}
        />

        {description !== null && (
          <EditableInput
            onChange={onUpdateDesc}
            placeholder="Your Description (optional)"
            value={description}
            color="grey"
          />
        )}
      </div>
      {(active || hoverActive) && (
        <div className={classes.FieldToolbar}>
          <IconButton onClick={setActiveField}>
            <SettingSvg width={16} height={16} color="rgb(137, 137, 137)" />
          </IconButton>
          <Dropdown.DropdownContainer>
            <IconButton onClick={toggleDdl}>
              <MoreSvg width={16} height={16} color="rgb(137, 137, 137)" />
            </IconButton>
            {ddlActive && (
              <Dropdown.DropdownList>
                <li className={classes.delete} onClick={onDeleteFieldClick}>
                  Delete
                </li>
              </Dropdown.DropdownList>
            )}
          </Dropdown.DropdownContainer>
        </div>
      )}
    </div>
  );
}

export default FieldInput;
