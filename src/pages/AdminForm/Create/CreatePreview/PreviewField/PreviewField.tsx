import React from 'react';
import { IFormField } from '../../../../../../interfaces/form/form.interface';
import { PreviewLinkedNode } from '../helpers/preview.model';
import { ANSWER_TYPE, IFieldAnswer } from '../helpers/preview.types';
import { getKeyByAnswerType } from '../helpers/preview.utils';
import classes from './PreviewField.module.css';
import TextField from './TextField/TextField';

interface IAnswerProps {
  answerField: IFieldAnswer | null;
  onNext: () => void;
  onChange: (value: string) => void;
}

function AnswerField({ answerField, onNext, onChange }: IAnswerProps) {
  if (answerField === null) {
    return null;
  }

  const { answer_type } = answerField;
  const keyAnswer = getKeyByAnswerType(answer_type);

  if (answer_type === ANSWER_TYPE.text) {
    return (
      <TextField
        onNext={onNext}
        onChange={onChange}
        value={(answerField[keyAnswer] || '') as string}
      />
    );
  } else {
    return <></>;
  }
}

interface IProps {
  fieldData: IFormField;
  previewNode: PreviewLinkedNode;
  onNextClick: (currNode: PreviewLinkedNode) => void;
  answerField: IFieldAnswer | null;
  updateAnswerField: <K extends keyof IFieldAnswer>(
    key: K,
    currNode: PreviewLinkedNode,
    value: IFieldAnswer[K]
  ) => void;
}

function PreviewField({
  fieldData,
  previewNode,
  onNextClick,
  answerField,
  updateAnswerField,
}: IProps) {
  const {
    title,
    properties: { description },
  } = fieldData;

  function onNext() {
    onNextClick(previewNode);
  }

  function onChange(value: string) {
    if (answerField) {
      const keyAnswer = getKeyByAnswerType(answerField.answer_type);
      updateAnswerField(keyAnswer, previewNode, value);
    }
  }

  return (
    <div className={classes.PreviewField}>
      <div className={classes.FieldTitle}>{title}</div>
      <div className={classes.FieldDescription}>{description}</div>
      <AnswerField
        answerField={answerField}
        onNext={onNext}
        onChange={onChange}
      />
    </div>
  );
}

export default PreviewField;
