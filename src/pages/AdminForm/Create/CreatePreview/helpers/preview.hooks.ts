import React, { useReducer, useRef } from 'react';
import { IForm } from '../../../../../../interfaces/form/form.interface';
import { Preview } from './preview.model';
import { IPreviewState } from './preview.types';
import { getPreviewAnswer } from './preview.utils';

export type ACTION = 'SET_PREVIEW';

interface IAction {
  type: ACTION;
  payload?: Partial<IPreviewState>;
}

const getInitialState = (formData: IForm): IPreviewState => {
  // TODO: build answer schema data
  const answerFieldData = getPreviewAnswer(formData.fields);

  return {
    answerData: {
      answer: answerFieldData,
      start_time: 0,
    },
    previewData: new Preview(formData),
  };
};

function previewReducer(state: IPreviewState, action: IAction): IPreviewState {
  const { previewData } = state;

  switch (action.type) {
    case 'SET_PREVIEW': {
      previewData.setLinkedPreviewFields();
      return {
        ...state,
        answerData: { ...state.answerData, start_time: +new Date() },
      };
    }
    default:
      return state;
  }
}

/**
 * Needed state:
 * 1. Answer Data by fields
 * 2, Preview fields to showcase slide screen.
 */

function usePreviewForm(formData: IForm) {
  const [state, dispatch] = useReducer(
    previewReducer,
    getInitialState(formData)
  );

  // // Update changes from formData if necessary
  // useEffect(() => {
  //   console.log('is changing');
  // }, [formData]);

  function setStartPreview() {
    dispatch({ type: 'SET_PREVIEW' });
  }

  return {
    state,
    setStartPreview,
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
