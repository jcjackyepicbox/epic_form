import React, { useCallback, useReducer, useRef } from 'react';
import { IForm } from '../interfaces/index.interface';
import { Preview, PreviewLinkedNode } from './preview.model';
import { IFieldAnswer, IPreviewState, PREVIEW_PHASE } from './preview.types';
import {
  getInitialPhase,
  getPreviewAnswer,
  getSetAnswer,
} from './preview.utils';

export type ACTION =
  | 'SET_START_TIME'
  | 'UPDATE_FIELD_ANSWER'
  | 'SET_FINISH'
  | 'RESTART_ALL';

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
  const answerFieldData = getPreviewAnswer(formData.fields);
  const setUnansweredData = getSetAnswer(answerFieldData);
  const previewData = new Preview(formData, answerFieldData);
  const { start_time, phaseType } = getInitialPhase(previewData);

  return {
    start_time,
    unanswered_data: setUnansweredData,
    previewData,
    phaseType,
  };
};

function previewReducer(state: IPreviewState, action: IAction): IPreviewState {
  switch (action.type) {
    case 'SET_START_TIME': {
      return {
        ...state,
        start_time: +new Date(),
        phaseType: PREVIEW_PHASE.content,
      };
    }

    case 'UPDATE_FIELD_ANSWER': {
      return {
        ...state,
      };
    }

    case 'SET_FINISH': {
      return {
        ...state,
        phaseType: PREVIEW_PHASE.end,
      };
    }

    case 'RESTART_ALL': {
      return {
        ...state,
        phaseType: action.payload?.phaseType || state.phaseType,
        previewData: action.payload?.previewData || state.previewData,
        start_time: action.payload?.start_time || state.start_time,
        unanswered_data:
          action.payload?.unanswered_data || state.unanswered_data,
      };
    }

    default:
      return state;
  }
}

function usePreviewForm(
  formData: IForm,
  postSubmitAnswer?: (
    startTime: number,
    answer: IFieldAnswer[],
    formId: string
  ) => Promise<{
    status: boolean;
    message: string;
  }>
) {
  const [state, dispatch] = useReducer(
    previewReducer,
    formData,
    getInitialState
  );

  function setStartPreview() {
    const { previewData } = state;
    previewData.setLinkedPreviewFields();
    dispatch({ type: 'SET_START_TIME' });
  }

  const updateAnswerField = useCallback(
    <K extends keyof IFieldAnswer>(
      key: K,
      currNode: PreviewLinkedNode,
      value: IFieldAnswer[K]
    ) => {
      if (currNode.answerData) {
        const { unanswered_data } = state;
        currNode.answerData[key] = value;

        if (value === null || (typeof value === 'string' && value === '')) {
          unanswered_data.add(currNode.answerData.field_id);
        } else {
          unanswered_data.delete(currNode.answerData.field_id);
        }

        dispatch({ type: 'UPDATE_FIELD_ANSWER' });
      }
    },
    [dispatch, state]
  );

  async function submitFormAnswer() {
    const { _id } = formData;
    const { start_time, previewData } = state;
    const answerData: IFieldAnswer[] = [];
    previewData.answersData.forEach((val) => answerData.push(val));
    let responseData: { status: boolean; message: string } | null = null;
    if (postSubmitAnswer && typeof postSubmitAnswer === 'function') {
      responseData = await postSubmitAnswer(start_time, answerData, _id);

      if (responseData && responseData.status === false) {
        console.error('Error occured', responseData.message);
        return;
      }
    }

    previewData.setThankyouScreen();
    dispatch({ type: 'SET_FINISH' });
  }

  function restartPreview() {
    const {
      phaseType,
      previewData,
      start_time,
      unanswered_data,
    } = getInitialState(formData);

    dispatch({
      type: 'RESTART_ALL',
      payload: {
        phaseType,
        previewData,
        start_time,
        unanswered_data,
      },
    });
  }

  return {
    state,
    setStartPreview,
    updateAnswerField,
    submitFormAnswer,
    restartPreview,
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
