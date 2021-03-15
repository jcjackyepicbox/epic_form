import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  IFormField,
  IFormSetting,
  SETTING_TYPE,
} from '../../../../../interfaces/form/form.interface';
import {
  updateFieldTitle,
  updateFieldProperties,
} from '../../../../../redux/actions/form.action';
import PlusSvg from '../../../../svg/PlusSvg';
import classes from './CreateField.module.css';
import FieldDropdown from './FieldDropdown/FieldDropdown';
import FieldInput from './FieldInput/FieldInput';

interface IProps {
  fieldFormData: IFormField[];
  formSettings: IFormSetting[];
  addQuestion: (type_id: SETTING_TYPE) => void;
  onSetActiveField: (_id: string) => void;
}

function CreateField({
  formSettings,
  fieldFormData,
  addQuestion,
  onSetActiveField,
}: IProps) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const dispatch = useDispatch();

  function toggleDropdown() {
    if (openDropdown) {
      setOpenDropdown(false);
    } else {
      setOpenDropdown(true);
    }
  }

  function onAddQuestion(type_id: SETTING_TYPE) {
    addQuestion(type_id);
    setOpenDropdown(false);
  }

  function updateTitle(field_id: string, value: string) {
    dispatch(updateFieldTitle(field_id, value));
  }

  function updateDescription(field_id: string, value: string) {
    dispatch(updateFieldProperties(field_id, 'description', value));
  }

  const fieldInputList = fieldFormData.map((val) => {
    const { _id } = val;
    return (
      <FieldInput
        key={_id}
        formFieldData={val}
        formSettings={formSettings}
        onChange={updateTitle}
        onSetActiveField={onSetActiveField}
        onUpdateDescription={updateDescription}
      />
    );
  });

  return (
    <div className={classes.CreateField}>
      {fieldInputList}
      <div className={classes.NewFieldContainer}>
        <div className={classes.NewField} onClick={toggleDropdown}>
          <div className={classes.NewFieldIcon}>
            <PlusSvg
              verticalAlign="middle"
              color="#fff"
              width={20}
              height={20}
            />
          </div>
          <span className={classes.NewFieldText}>Add new question</span>
        </div>
        <FieldDropdown
          addQuestion={onAddQuestion}
          formSettings={formSettings}
          onCloseDropdown={() => setOpenDropdown(false)}
          openDropdown={openDropdown}
        />
      </div>
    </div>
  );
}

export default CreateField;
