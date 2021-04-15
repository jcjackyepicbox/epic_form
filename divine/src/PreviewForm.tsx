import React from 'react';
import { IForm } from './interfaces/index.interface';
import RestartSvg from './svg/RestartSvg';
import classes from './PreviewForm.module.css';
import usePreviewForm, { useDynamicRef } from './helpers/preview.hooks';
import { IFieldAnswer, PREVIEW_PHASE } from './helpers/preview.types';
import PreviewContainer from './containers/PreviewContainer/PreviewContainer';
import PreviewFooter from './containers/PreviewFooter/PreviewFooter';

interface IProps {
  formData: IForm;
  isDevelopment?: boolean;
  postSubmitAnswer?: (
    startTime: number,
    answer: IFieldAnswer[],
    formId: string
  ) => Promise<{
    status: boolean;
    message: string;
  }>;
}

function CreatePreview({ formData, isDevelopment, postSubmitAnswer }: IProps) {
  const {
    state: { previewData, unanswered_data, phaseType },
    setStartPreview,
    updateAnswerField,
    submitFormAnswer,
    restartPreview,
  } = usePreviewForm(formData, postSubmitAnswer);

  const [getRef, setRef] = useDynamicRef();

  return (
    <div className={classes.CreatePreview}>
      <div className={classes.PreviewBackground} />

      <PreviewContainer
        previewData={previewData}
        setRef={setRef}
        setStartPreview={setStartPreview}
        getRef={getRef}
        updateAnswerField={updateAnswerField}
        showStartBtn={phaseType === PREVIEW_PHASE.start}
        onSubmit={submitFormAnswer}
      />

      <PreviewFooter
        totalAnswer={previewData.answersData.size}
        totalUnasnwered={unanswered_data.size}
        showAnswerProgress={phaseType === PREVIEW_PHASE.content}
      />
      {isDevelopment && (
        <div className={classes.RestartContainer} onClick={restartPreview}>
          <RestartSvg />
        </div>
      )}
    </div>
  );
}

export default CreatePreview;
