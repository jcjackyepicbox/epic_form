import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  IChoiceForm,
  IFormField,
  IFormSetting,
  SETTING_TYPE,
} from '../../../../../interfaces/form/form.interface';
import {
  updateFieldTitle,
  updateFieldProperties,
  addQuestionField,
  deleteField,
  updateChoiceFieldProperties,
  addChoiceFieldProperties,
  deleteChoiceFieldProperties,
} from '../../../../../redux/actions/form.action';
import {
  getNewChoiceFormField,
  getNewFormField,
} from '../../../../data/form.data';
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

  function actionAddQuestion(type_id: SETTING_TYPE) {
    const newField = getNewFormField(type_id);
    newField.properties.choices.push(getNewChoiceFormField());
    dispatch(addQuestionField(newField));
    onSetActiveField(newField._id);
    setOpenDropdown(false);
  }

  function actionDeleteField(field_id: string) {
    dispatch(deleteField(field_id));
  }

  function actionUpdateTitle(field_id: string, value: string) {
    dispatch(updateFieldTitle(field_id, value));
  }

  function actionUpdateDescription(field_id: string, value: string) {
    dispatch(updateFieldProperties(field_id, 'description', value));
  }

  function actionUpdateChoiceChange(
    field_id: string,
    choice_id: string,
    label: string
  ) {
    dispatch(updateChoiceFieldProperties(field_id, choice_id, label));
  }

  function actionAddChoice(field_id: string, new_choice: IChoiceForm) {
    dispatch(addChoiceFieldProperties(field_id, new_choice));
  }

  function actionDeleteChoice(field_id: string, choice_id: string) {
    dispatch(deleteChoiceFieldProperties(field_id, choice_id));
  }

  const fieldInputList = fieldFormData.map((val) => {
    const { _id } = val;
    return (
      <FieldInput
        active={_id === activeFieldId}
        key={_id}
        formFieldData={val}
        formSettings={formSettings}
        onTitleChange={actionUpdateTitle}
        onSetActiveField={onSetActiveField}
        onUpdateDescription={actionUpdateDescription}
        onDeleteField={actionDeleteField}
        onUpdateChoiceChange={actionUpdateChoiceChange}
        onAddChoice={actionAddChoice}
        onDeleteChoice={actionDeleteChoice}
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
          addQuestion={actionAddQuestion}
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
