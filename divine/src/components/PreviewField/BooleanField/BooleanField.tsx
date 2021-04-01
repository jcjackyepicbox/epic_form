import React, { useState } from 'react';
import cx from 'classnames';

import classes from './BooleanField.module.css';
import BoldCheckSvg from '../../../svg/BoldCheckSvg';
import PreviewButton from '../../PreviewButton/PreviewButton';

interface IProps {
  onNext: () => void;
  onChange: (value: any) => void;
  value: number | null;
  isLastNode: boolean;
}

function BooleanField({ value, onNext, onChange, isLastNode }: IProps) {
  const [showSubmit, setShowSubmit] = useState<boolean>(false);

  function onYesClicked() {
    onChange(1);

    if (isLastNode) {
      setShowSubmit(true);
    } else {
      onNext();
    }
  }

  function onNoClicked() {
    onChange(0);

    if (isLastNode) {
      setShowSubmit(true);
    } else {
      onNext();
    }
  }

  return (
    <>
      <div className={classes.ChoiceContainer}>
        <div
          className={cx(classes.ChoiceItem, {
            [classes.Selected]: value === 1,
          })}
          onClick={onYesClicked}
        >
          <span>Yes</span>
          <div className={classes.CheckedIcon}>
            <BoldCheckSvg />
          </div>
        </div>
        <div
          className={cx(classes.ChoiceItem, {
            [classes.Selected]: value === 0,
          })}
          onClick={onNoClicked}
        >
          <span>No</span>
          <div className={classes.CheckedIcon}>
            <BoldCheckSvg />
          </div>
        </div>
      </div>

      <PreviewButton size="medium" hidden={!showSubmit} onClick={onNext}>
        Submit
      </PreviewButton>
    </>
  );
}

export default BooleanField;
