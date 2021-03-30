import React from 'react';
import { IFormField } from '../../../../../../interfaces/form/form.interface';
import PreviewButton from '../PreviewButton/PreviewButton';
import classes from './PreviewThankyou.module.css';

interface IProps {
  fieldData: IFormField;
}
function PreviewThankyou({ fieldData }: IProps) {
  const {
    title,
    properties: { button_text, description },
  } = fieldData;

  return (
    <div className={classes.ThankyouScreen}>
      <h1>{title}</h1>
      {description && (
        <div className={classes.ThankyouDescription}>{description}</div>
      )}
      <PreviewButton size="medium">{button_text}</PreviewButton>
    </div>
  );
}

export default PreviewThankyou;
