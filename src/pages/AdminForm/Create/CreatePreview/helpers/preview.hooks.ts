import React, { useReducer, useRef } from 'react';
import { IForm } from '../../../../../../interfaces/form/form.interface';
import { Preview, PreviewLinkedNode } from './preview.model';
import { IFieldAnswer, IPreviewState } from './preview.types';
import { getPreviewAnswer } from './preview.utils';

export type ACTION = 'SET_START_TIME' | 'UPDATE_FIELD_ANSWER';

export type TAnswerType<K extends keyof IFieldAnswer> = {
  fieldNode: PreviewLinkedNode;
  key: K;
  value: IFieldAnswer[K];
};

interface IAction {
  type: ACTION;
  payload?: Partial<IPreviewState>;
}

const getInitialState = (formData: IForm): IPreviewState => {
  // TODO: build answer schema data
  const answerFieldData = getPreviewAnswer(formData.fields);

  return {
    answerData: {
      start_time: 0,
    },
    previewData: new Preview(formData, answerFieldData),
  };
};

function previewReducer(state: IPreviewState, action: IAction): IPreviewState {
  switch (action.type) {
    case 'SET_START_TIME': {
      return {
        ...state,
        answerData: { ...state.answerData, start_time: +new Date() },
      };
    }

    case 'UPDATE_FIELD_ANSWER': {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}

function usePreviewForm(formData: IForm) {
  const [state, dispatch] = useReducer(
    previewReducer,
    getInitialState(formData)
  );

  function setStartPreview() {
    const { previewData } = state;
    previewData.setLinkedPreviewFields();
    dispatch({ type: 'SET_START_TIME' });
  }

  function updateAnswerField<K extends keyof IFieldAnswer>(
    key: K,
    currNode: PreviewLinkedNode,
    value: IFieldAnswer[K]
  ) {
    if (currNode.answerData) {
      /**
       * dispatch answer meta data
       * 1. next unanswered node
       * 2. update unanswered data
       */
      currNode.answerData[key] = value;

      dispatch({ type: 'UPDATE_FIELD_ANSWER' });
    }
  }

  return {
    state,
    setStartPreview,
    updateAnswerField,
  };
}

export function useDynamicRef(): [
  (key: string) => React.RefObject<HTMLDivElement>,
  (key: string) => React.RefObject<HTMLDivElement>
] {
  const map = useRef(new Map<string, React.RefObject<HTMLDivElement>>());

  function setRef(key: string): React.RefObject<HTMLDivElement> {
    const ref = React.createRef<HTMLDivElement>();
    map.current.set(key, ref);
    return ref;
  }

  function getRef(key: string): React.RefObject<HTMLDivElement> {
    return map.current.get(key) as React.RefObject<HTMLDivElement>;
  }

  return [getRef, setRef];
}

export default usePreviewForm;
