import { IFieldAnswer } from '@epic-form/divine/dist/types/helpers/preview.types';
import React from 'react';
import {
  IFormField,
  IFormSetting,
  SETTING_TYPE,
} from '../../../../../interfaces/form/form.interface';
import { getActiveSettings } from '../../../../utils/create.utils';
import { mapIconCompoennt } from '../../Create/CreateField/FieldDropdown/FieldDropdown';
import ChoiceSummary from './ChoiceSummary/ChoiceSummary';
import classes from './ResponseSummary.module.css';

interface IProps {
  formFields: IFormField[];
  formSettings: IFormSetting[];
  formResponseByField: Record<string, IFieldAnswer[]>;
  totalResponse: number;
}

interface ISummaryFieldProps {
  type_id: SETTING_TYPE;
  answerField: IFieldAnswer[];
  formField: IFormField;
  validAnswer: number;
}

function getValidAnswerLength(
  type_id: SETTING_TYPE,
  answerField: IFieldAnswer[]
) {
  if (type_id === SETTING_TYPE.multiple_choice) {
    return answerField.filter((val) => !!val.choices).length;
  }

  if (type_id === SETTING_TYPE.short_text) {
    return answerField.filter((val) => !!val.text).length;
  }

  if (type_id === SETTING_TYPE.yes_no) {
    return answerField.filter((val) => !!val.boolean).length;
  }

  return 0;
}

function SummaryField({
  type_id,
  answerField,
  formField,
  validAnswer,
}: ISummaryFieldProps) {
  if (type_id === SETTING_TYPE.multiple_choice) {
    return (
      <ChoiceSummary
        answerField={answerField}
        formField={formField}
        validAnswer={validAnswer}
      />
    );
  }

  return null;
}

function ResponseSummary({
  formFields,
  formSettings,
  formResponseByField,
  totalResponse,
}: IProps) {
  const summaryItemElement = formFields.map((val, idx) => {
    const { _id, title, type_id } = val;
    const { icon, type_color } = getActiveSettings(formSettings, type_id);
    const iconSvg = mapIconCompoennt(icon);

    const answerField = formResponseByField[_id] || [];
    const validAnswer = getValidAnswerLength(type_id, answerField);

    return (
      <div className={classes.SummaryItem} key={_id}>
        <div className={classes.SummaryIconContainer}>
          <div
            className={classes.SummaryIcon}
            style={{ background: type_color }}
          >
            {iconSvg}
            <div className={classes.SummaryOrder}>{idx + 1}</div>
          </div>
        </div>
        <div className={classes.SummaryContent}>
          <div className={classes.SummaryContentTitle}>{title}</div>
          <div className={classes.SummaryContentDescription}>
            {validAnswer} out of {totalResponse} people answered this question
          </div>
          <div className={classes.SummaryFieldContent}>
            <SummaryField
              type_id={type_id}
              answerField={answerField}
              formField={val}
              validAnswer={validAnswer}
            />
          </div>
        </div>
      </div>
    );
  });

  return <div className={classes.SummaryContainer}>{summaryItemElement}</div>;
}

export default React.memo(ResponseSummary);
