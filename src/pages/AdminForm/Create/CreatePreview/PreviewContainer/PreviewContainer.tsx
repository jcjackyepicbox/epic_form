import React, { useEffect, useRef, useState } from 'react';
import { SETTING_TYPE } from '../../../../../../interfaces/form/form.interface';
import { Preview, PreviewLinkedNode } from '../helpers/preview.model';
import { IFieldAnswer, IFormAnswer } from '../helpers/preview.types';
import { searchNode } from '../helpers/preview.utils';
import PreviewField from '../PreviewField/PreviewField';
import PreviewWelcome from '../PreviewWelcome/PreviewWelcome';
import classes from './PreviewContainer.module.css';

interface IProps {
  previewData: Preview;
  answerData: IFormAnswer;
  setRef: (key: string) => React.RefObject<HTMLDivElement>;
  getRef: (key: string) => React.RefObject<HTMLDivElement>;
  setStartPreview: () => void;
  updateAnswerField: <K extends keyof IFieldAnswer>(
    key: K,
    currNode: PreviewLinkedNode,
    value: IFieldAnswer[K]
  ) => void;
}

function PreviewContainer({
  previewData,
  setRef,
  setStartPreview,
  getRef,
  answerData,
  updateAnswerField,
}: IProps) {
  const { start_time } = answerData;
  const previewItemComponent: JSX.Element[] = [];
  const [startFieldId, setStart] = useState<string>('');
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else if (startFieldId !== '') {
      const currNode = searchNode(previewData.previewNode, startFieldId);
      if (currNode && currNode.next) {
        const nextRef = getRef(currNode.next.fieldData._id);
        nextRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      setStart('');
    }
  }, [previewData.previewNode]);

  let currNode = previewData.previewNode;
  while (currNode != null) {
    const fieldData = currNode.fieldData;
    const answerData = currNode.answerData;

    if (fieldData.type_id === SETTING_TYPE.welcome_screen) {
      previewItemComponent.push(
        <div
          className={classes.PreviewItem}
          key={fieldData._id}
          ref={setRef(fieldData._id)}
        >
          <PreviewWelcome
            fieldData={fieldData}
            onClick={startClick}
            previewNode={currNode}
            showStartBtn={start_time === 0}
          />
        </div>
      );
    } else if (fieldData.type_id !== SETTING_TYPE.thankyou_screen) {
      previewItemComponent.push(
        <div
          className={classes.PreviewItem}
          key={fieldData._id}
          ref={setRef(fieldData._id)}
        >
          <PreviewField
            fieldData={fieldData}
            onNextClick={onFieldNext}
            previewNode={currNode}
            answerField={answerData}
            updateAnswerField={updateAnswerField}
          />
        </div>
      );
    }

    currNode = currNode.next;
  }

  function startClick(currNode: PreviewLinkedNode) {
    setStartPreview();
    setStart(currNode.fieldData._id);
  }

  function onFieldNext(currNode: PreviewLinkedNode) {
    // get last field to perform SUBMIT action
    // if thankyou screen exists then check if next is thankyou screen
    // else check if next is null

    if (
      currNode.next === null ||
      (currNode.next &&
        currNode.next.fieldData.type_id === SETTING_TYPE.thankyou_screen)
    ) {
      // submit
      console.log('submit');
    } else if (currNode.next) {
      const nextRef = getRef(currNode.next.fieldData._id);
      nextRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return <div className={classes.PreviewContainer}>{previewItemComponent}</div>;
}

export default PreviewContainer;
