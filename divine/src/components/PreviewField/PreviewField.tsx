import React from 'react';
import { IFormField } from '../../interfaces/index.interface';
import { PreviewLinkedNode } from '../../helpers/preview.model';
import {
  ANSWER_TYPE,
  IChoiceAnswer,
  IFieldAnswer,
} from '../../helpers/preview.types';
import { getKeyByAnswerType } from '../../helpers/preview.utils';
import BooleanField from './BooleanField/BooleanField';
import ChoiceField from './ChoiceField/ChoiceField';
import classes from './PreviewField.module.css';
import TextField from './TextField/TextField';

interface IAnswerProps {
  fieldData: IFormField;
  answerField: IFieldAnswer | null;
  onNext: () => void;
  onChange: (value: any) => void;
  isLastNode: boolean;
}

function AnswerField({
  answerField,
  onNext,
  onChange,
  fieldData,
  isLastNode,
}: IAnswerProps) {
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
        isLastNode={isLastNode}
      />
    );
  } else if (answer_type === ANSWER_TYPE.boolean) {
    return (
      <BooleanField
        value={answerField[keyAnswer] as number | null}
        onChange={onChange}
        onNext={onNext}
        isLastNode={isLastNode}
      />
    );
  } else if (answer_type === ANSWER_TYPE.choices) {
    return (
      <ChoiceField
        fieldData={fieldData}
        onChange={onChange}
        value={answerField[keyAnswer] as IChoiceAnswer | null}
        isLastNode={isLastNode}
        onNext={onNext}
      />
    );
  }

  return null;
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

  function onChange(value: any) {
    if (answerField) {
      const keyAnswer = getKeyByAnswerType(answerField.answer_type);
      updateAnswerField(keyAnswer, previewNode, value);
    }
  }

  const isLastNode = previewNode.next === null;

  return (
    <div className={classes.PreviewField}>
      <div className={classes.FieldTitle}>{title}</div>
      <div className={classes.FieldDescription}>{description}</div>
      <AnswerField
        answerField={answerField}
        onNext={onNext}
        onChange={onChange}
        fieldData={fieldData}
        isLastNode={isLastNode}
      />
    </div>
  );
}

export default PreviewField;
