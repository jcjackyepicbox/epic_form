import React from 'react';
import {
  IForm,
  IFormField,
} from '../../../../../interfaces/form/form.interface';
import RestartSvg from '../../../../svg/RestartSvg';
import classes from './CreatePreview.module.css';
import usePreviewForm, { useDynamicRef } from './helpers/preview.hooks';
import { PREVIEW_PHASE } from './helpers/preview.types';
import PreviewContainer from './PreviewContainer/PreviewContainer';
import PreviewFooter from './PreviewFooter/PreviewFooter';

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
    state: { previewData, unanswered_data, phaseType },
    setStartPreview,
    updateAnswerField,
    submitFormAnswer,
    restartPreview,
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
        updateAnswerField={updateAnswerField}
        showStartBtn={phaseType === PREVIEW_PHASE.start}
        onSubmit={submitFormAnswer}
      />

      {/* Absolute Button */}
      <PreviewFooter
        totalAnswer={previewData.answersData.size}
        totalUnasnwered={unanswered_data.size}
      />

      <div className={classes.RestartContainer} onClick={restartPreview}>
        <RestartSvg />
      </div>
    </div>
  );
}

export default CreatePreview;
