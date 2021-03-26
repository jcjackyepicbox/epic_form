import React from 'react';
import cx from 'classnames';
import { IFormField } from '../../../../../../interfaces/form/form.interface';
import { PreviewLinkedNode } from '../helpers/preview.model';
import classes from './PreviewWelcome.module.css';
import PreviewButton from '../PreviewButton/PreviewButton';

interface IProps {
  fieldData: IFormField;
  onClick: (currNode: PreviewLinkedNode) => void;
  previewNode: PreviewLinkedNode;
  showStartBtn: boolean;
}

function PreviewWelcome({
  fieldData,
  onClick,
  previewNode,
  showStartBtn,
}: IProps) {
  const {
    title,
    properties: { button_text, description },
  } = fieldData;

  return (
    <div className={classes.WelcomeScreen}>
      <h1>{title}</h1>
      <div className={classes.WelcomeDescription}>{description}</div>
      <PreviewButton
        size="large"
        onClick={() => onClick(previewNode)}
        hidden={!showStartBtn}
      >
        {button_text}
      </PreviewButton>
    </div>
  );
}

export default PreviewWelcome;
