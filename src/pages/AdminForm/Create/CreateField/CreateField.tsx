import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  IFormField,
  IFormSetting,
  SETTING_TYPE,
} from '../../../../../interfaces/form/form.interface';
import {
  updateFieldTitle,
  updateFieldProperties,
  addQuestionField,
  deleteField,
} from '../../../../../redux/actions/form.action';
import { getNewFormField } from '../../../../data/form.data';
import PlusSvg from '../../../../svg/PlusSvg';
import classes from './CreateField.module.css';
import FieldDropdown from './FieldDropdown/FieldDropdown';
import FieldInput from './FieldInput/FieldInput';

export interface IDropdownFormSettings extends IFormSetting {
  disable: boolean;
}

interface IProps {
  activeFieldId: string;
  fieldFormData: IFormField[];
  formSettings: IFormSetting[];
  onSetActiveField: (_id: string) => void;
}

function CreateField({
  activeFieldId,
  formSettings,
  fieldFormData,
  onSetActiveField,
}: IProps) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const ddlContainerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  function toggleDropdown() {
    if (openDropdown) {
      setOpenDropdown(false);
    } else {
      setOpenDropdown(true);
    }
  }

  function onAddQuestion(type_id: SETTING_TYPE) {
    const newField = getNewFormField(type_id);
    dispatch(addQuestionField(newField));
    onSetActiveField(newField._id);
    setOpenDropdown(false);
  }

  function onDeleteField(field_id: string) {
    dispatch(deleteField(field_id));
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
        active={_id === activeFieldId}
        key={_id}
        formFieldData={val}
        formSettings={formSettings}
        onChange={updateTitle}
        onSetActiveField={onSetActiveField}
        onUpdateDescription={updateDescription}
        onDeleteField={onDeleteField}
      />
    );
  });

  const dropdownFormSettings = mapDropdownFormSettings(
    formSettings,
    fieldFormData
  );

  return (
    <div className={classes.CreateField}>
      {fieldInputList}
      <div className={classes.NewFieldContainer} ref={ddlContainerRef}>
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
          formSettings={dropdownFormSettings}
          onCloseDropdown={() => setOpenDropdown(false)}
          openDropdown={openDropdown}
          ddlContainerRef={ddlContainerRef.current?.getBoundingClientRect()}
        />
      </div>
    </div>
  );
}

function mapDropdownFormSettings(
  formSettings: IFormSetting[],
  fieldFormData: IFormField[]
): IDropdownFormSettings[] {
  return formSettings.map((val) => {
    let disable = false;
    if (val.appear_once) {
      const getFormAppear = fieldFormData.filter(
        (form) => form.type_id === val.type_id
      );
      disable = getFormAppear.length > 0;
    }

    return {
      ...val,
      disable,
    };
  });
}

export default CreateField;
