import React, { useState } from 'react';
import cx from 'classnames';
import { IFormField } from '../../../interfaces/index.interface';
import { IChoiceAnswer } from '../../../helpers/preview.types';
import PreviewButton from '../../PreviewButton/PreviewButton';
import classes from './ChoiceField.module.css';
import BoldCheckSvg from '../../../svg/BoldCheckSvg';

interface IProps {
  fieldData: IFormField;
  value: IChoiceAnswer | null;
  onChange: (value: any) => void;
  onNext: () => void;
  isLastNode: boolean;
}

function ChoiceField({
  fieldData,
  value,
  onChange,
  isLastNode,
  onNext,
}: IProps) {
  const [showSubmit, setShowSubmit] = useState<boolean>(false);

  const {
    properties: { choices },
  } = fieldData;

  const selectedValue = value || {
    choice_id: '',
    text: '',
  };

  function onChoiceClicked(choice_id: string, text: string) {
    onChange({
      choice_id,
      text,
    });

    if (isLastNode) {
      setShowSubmit(true);
    } else {
      onNext();
    }
  }

  const choiceItemComponent = choices.map((val) => {
    const { _id, label } = val;
    return (
      <li
        role="listitem"
        tabIndex={0}
        className={cx(classes.ChoiceItem, {
          [classes.Selected]: _id === selectedValue.choice_id,
        })}
        key={_id}
        onClick={() => onChoiceClicked(_id, label)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChoiceClicked(_id, label);
          }
        }}
      >
        <span>{label}</span>
        <div className={classes.CheckedIcon}>
          <BoldCheckSvg />
        </div>
      </li>
    );
  });

  return (
    <>
      <ul className={classes.ChoiceContainer} role="list">
        {choiceItemComponent}
      </ul>
      <PreviewButton size="medium" hidden={!showSubmit} onClick={onNext}>
        Submit
      </PreviewButton>
    </>
  );
}

export default ChoiceField;
