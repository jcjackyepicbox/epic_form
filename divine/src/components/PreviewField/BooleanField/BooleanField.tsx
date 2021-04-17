import React, { useEffect, useState } from 'react';
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
      <ul className={classes.ChoiceContainer} role="list">
        <li
          className={cx(classes.ChoiceItem, {
            [classes.Selected]: value === 1,
          })}
          onClick={onYesClicked}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onYesClicked();
          }}
          role="listitem"
          tabIndex={0}
        >
          <span>Yes</span>
          <div className={classes.CheckedIcon}>
            <BoldCheckSvg />
          </div>
        </li>
        <li
          role="listitem"
          className={cx(classes.ChoiceItem, {
            [classes.Selected]: value === 0,
          })}
          onClick={onNoClicked}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onNoClicked();
          }}
          tabIndex={0}
        >
          <span>No</span>
          <div className={classes.CheckedIcon}>
            <BoldCheckSvg />
          </div>
        </li>
      </ul>

      <PreviewButton size="medium" hidden={!showSubmit} onClick={onNext}>
        Submit
      </PreviewButton>
    </>
  );
}

export default BooleanField;
