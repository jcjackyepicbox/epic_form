import React from 'react';
import PreviewButton from '../../PreviewButton/PreviewButton';
import classes from './TextField.module.css';

interface IProps {
  value: string;
  onNext: () => void;
  onChange: (value: string) => void;
}

function TextField({ onNext, onChange, value }: IProps) {
  return (
    <div className={classes.TextField}>
      <input
        type="text"
        placeholder="Your answer"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />

      <PreviewButton
        size="medium"
        icon="check"
        onClick={onNext}
        hidden={value === ''}
      >
        OK
      </PreviewButton>
    </div>
  );
}

export default TextField;
