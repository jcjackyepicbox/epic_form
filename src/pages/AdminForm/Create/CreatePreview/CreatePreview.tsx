import React from 'react';
import {
  IForm,
  IFormField,
} from '../../../../../interfaces/form/form.interface';
import classes from './CreatePreview.module.css';
import usePreviewForm, { useDynamicRef } from './helpers/preview.hooks';
import PreviewContainer from './PreviewContainer/PreviewContainer';

/**
 * Can be extendable to create one more web apps as a form view.
 * hence, we only using props as one way communication and have no say in any redux
 */
interface IProps {
  activeField: IFormField | null;
  formData: IForm;
}

function CreatePreview({ activeField, formData }: IProps) {
  const {
    state: { previewData, answerData },
    setStartPreview,
  } = usePreviewForm(formData);

  const [getRef, setRef] = useDynamicRef();

  return (
    <div className={classes.CreatePreview}>
      {/* If any background */}
      <div className={classes.PreviewBackground} />

      {/* Field Preview Data */}
      <PreviewContainer
        previewData={previewData}
        setRef={setRef}
        setStartPreview={setStartPreview}
        getRef={getRef}
        answerData={answerData}
      />

      {/* Absolute Button */}
      <div className={classes.PreviewFooter}>
        <div className={classes.PoweredBar}>
          Powered by <span className={classes.PoweredTitle}>Epicform</span>
        </div>

        <div className={classes.ProgressBar}>
          <div className={classes.ProgressTitle}>
            0 of {answerData.answer.length} answered
          </div>
          <div className={classes.BarContainer}>
            <div className={classes.BarFill} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePreview;
