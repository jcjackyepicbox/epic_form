import React, { useCallback, useState } from 'react';
import {
  IChoiceForm,
  IFormField,
  IFormSetting,
  SETTING_TYPE,
} from '../../../../../../interfaces/form/form.interface';
import Dropdown from '../../../../../components/Dropdown/Dropdown';
import EditableChoiceInput from '../../../../../components/EditableChoiceInput/EditableChoiceInput';
import EditableInput from '../../../../../components/EditableInput/EditableInput';
import IconButton from '../../../../../components/IconButton/IconButton';
import { mapPlaceholderField } from '../../../../../constants/create/create.constant';
import MoreSvg from '../../../../../svg/MoreSvg';
import SettingSvg from '../../../../../svg/SettingSvg';
import { getActiveSettings } from '../../../../../utils/create.utils';
import { mapIconCompoennt } from '../FieldDropdown/FieldDropdown';
import classes from './FieldInput.module.css';

interface IProps {
  orderNum: number | null;
  active: boolean;
  formFieldData: IFormField;
  formSettings: IFormSetting[];
  onTitleChange: (field_id: string, value: string) => void;
  onUpdateChoiceChange: (
    field_id: string,
    choice_id: string,
    label: string
  ) => void;
  onSetActiveField: (field_id: string) => void;
  onUpdateDescription: (field_id: string, value: string) => void;
  onDeleteField: (field_id: string) => void;
  onAddChoice: (field_id: string, new_choice: IChoiceForm) => void;
  onDeleteChoice: (field_id: string, choice_id: string) => void;
}

function FieldInput({
  formFieldData,
  formSettings,
  onTitleChange,
  onUpdateChoiceChange,
  onSetActiveField,
  onUpdateDescription,
  active,
  onAddChoice,
  onDeleteField,
  onDeleteChoice,
  orderNum,
}: IProps) {
  const [hoverActive, setHoverActive] = useState<boolean>(false);
  const [ddlActive, setDdlActive] = useState<boolean>(false);

  const {
    _id,
    title,
    type_id,
    properties: { description, choices },
  } = formFieldData;
  const activeSettings = getActiveSettings(formSettings, type_id);

  const { icon, type_color } = activeSettings;
  const placeholder = mapPlaceholderField[type_id];
  const iconSvg = mapIconCompoennt(icon);

  const actionInputChange = useCallback(
    (value: string) => {
      onTitleChange(_id, value);
    },
    [_id]
  );

  const actionAddChoice = useCallback(
    (new_choice: IChoiceForm) => {
      onAddChoice(_id, new_choice);
    },
    [_id]
  );

  const actionDeleteChoice = useCallback(
    (choice_id: string) => {
      onDeleteChoice(_id, choice_id);
    },
    [_id]
  );

  const actionUpdateDescription = useCallback(
    (value: string) => {
      onUpdateDescription(_id, value);
    },
    [_id]
  );

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

  const actionChoiceInputChange = useCallback(
    (choice_id: string, label: string) => {
      onUpdateChoiceChange(_id, choice_id, label);
    },
    [_id]
  );

  return (
    <div
      className={classes.FieldContainer}
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={onLeaveField}
      onFocus={() => onSetActiveField(_id)}
    >
      <div className={classes.FieldIconContainer} onClick={setActiveField}>
        <div className={classes.FieldIcon} style={{ background: type_color }}>
          {iconSvg}
          <div className={classes.FieldOrder}>{orderNum}</div>
        </div>
      </div>
      <div className={classes.FieldWorkspace} onClick={setActiveField}>
        <EditableInput
          onChange={actionInputChange}
          placeholder={placeholder}
          value={title}
        />

        {description !== null && (
          <EditableInput
            onChange={actionUpdateDescription}
            placeholder="Description (optional)"
            value={description}
            color="grey"
          />
        )}

        {type_id === SETTING_TYPE.multiple_choice && (
          <EditableChoiceInput
            onAddChoice={actionAddChoice}
            choiceValue={choices}
            onChange={actionChoiceInputChange}
            onDeleteChoice={actionDeleteChoice}
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
              <Dropdown.DropdownList toRight={true}>
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
