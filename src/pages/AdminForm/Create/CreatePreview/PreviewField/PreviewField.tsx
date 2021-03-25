import React from 'react';
import { IFormField } from '../../../../../../interfaces/form/form.interface';
import classes from './PreviewField.module.css';

interface IProps {
  fieldData: IFormField;
}

function PreviewField({ fieldData }: IProps) {
  const {
    title,
    properties: { description },
  } = fieldData;

  return (
    <div className={classes.PreviewField}>
      <div className={classes.FieldTitle}>{title}</div>
      <button>Next</button>
    </div>
  );
}

export default PreviewField;
