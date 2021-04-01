import React from 'react';
import PreviewForm from '@epic-form/divine';
import classes from './CreatePreview.module.css';
import { IForm } from '../../../../../interfaces/form/form.interface';

interface IProps {
  formData: IForm;
}

function CreatePreview({ formData }: IProps) {
  return (
    <div className={classes.CreatePreview}>
      <PreviewForm formData={formData} />
    </div>
  );
}

export default CreatePreview;
