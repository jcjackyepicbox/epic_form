import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
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
  reorderFieldForm,
} from '../../../../../redux/actions/form.action';
import {
  getNewChoiceFormField,
  getNewFormField,
} from '../../../../data/form.data';
import PlusSvg from '../../../../svg/PlusSvg';
import classes from './CreateField.module.css';
import FieldDropdown from './FieldDropdown/FieldDropdown';
import FieldInput from './FieldInput/FieldInput';
import { deepCopyObject } from '../../../../utils/deepCopy';

export interface IDropdownFormSettings extends IFormSetting {
  disable: boolean;
}

interface IProps {
  activeFieldId: string;
  fieldFormData: IFormField[];
  formSettings: IFormSetting[];
  onSetActiveField: (_id: string) => void;
}

interface IItem {
  id: string;
  content: string;
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

  const dropdownFormSettings = mapDropdownFormSettings(
    formSettings,
    fieldFormData
  );

  function onDragEnd(result: DropResult) {
    // dropped outside the list

    const welcomeScreen = fieldFormData.filter(
      (val) => val.type_id === SETTING_TYPE.welcome_screen
    );

    const thankyouScreen = fieldFormData.filter(
      (val) => val.type_id === SETTING_TYPE.thankyou_screen
    );

    if (
      !result.destination ||
      (welcomeScreen.length > 0 && result.destination.index === 0) ||
      (thankyouScreen.length > 0 &&
        result.destination.index === fieldFormData.length - 1)
    ) {
      console.error('Cannot reorder within welcome/thankyou screen');
      // put toast of error, cannot reorder within welcome/thankyou screen
      return;
    }

    dispatch(reorderFieldForm(result.source.index, result.destination.index));
  }

  return (
    <div className={classes.CreateField}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fieldFormData.map((item, index) => {
                const { _id, type_id } = item;

                let isDraggableDisable = false;
                if (
                  type_id === SETTING_TYPE.welcome_screen ||
                  type_id === SETTING_TYPE.thankyou_screen
                ) {
                  isDraggableDisable = true;
                }

                return (
                  <Draggable
                    key={_id}
                    draggableId={_id}
                    index={index}
                    isDragDisabled={isDraggableDisable}
                    disableInteractiveElementBlocking={isDraggableDisable}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                          className={cx({
                            [classes.isDragging]: snapshot.isDragging,
                          })}
                        >
                          <FieldInput
                            active={_id === activeFieldId}
                            key={_id}
                            formFieldData={item}
                            formSettings={formSettings}
                            onTitleChange={actionUpdateTitle}
                            onSetActiveField={onSetActiveField}
                            onUpdateDescription={actionUpdateDescription}
                            onDeleteField={actionDeleteField}
                            onUpdateChoiceChange={actionUpdateChoiceChange}
                            onAddChoice={actionAddChoice}
                            onDeleteChoice={actionDeleteChoice}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
