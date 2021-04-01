import React from 'react';
import PreviewButton from '../../PreviewButton/PreviewButton';
import classes from './TextField.module.css';

interface IProps {
  value: string;
  onNext: () => void;
  onChange: (value: string) => void;
  isLastNode: boolean;
}

function TextField({ onNext, onChange, value, isLastNode }: IProps) {
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
        {isLastNode ? 'Submit' : 'OK'}
      </PreviewButton>
    </div>
  );
}

export default TextField;
