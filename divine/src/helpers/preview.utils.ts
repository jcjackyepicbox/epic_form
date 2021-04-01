import { IFormField, SETTING_TYPE } from '../interfaces/index.interface';
import { Preview, PreviewLinkedNode } from './preview.model';
import { ANSWER_TYPE, IFieldAnswer, PREVIEW_PHASE } from './preview.types';

export const mapFieldAnswerType: Record<SETTING_TYPE, ANSWER_TYPE> = {
  multiple_choice: ANSWER_TYPE.choices,
  number: ANSWER_TYPE.number,
  short_text: ANSWER_TYPE.text,
  yes_no: ANSWER_TYPE.boolean,
  thankyou_screen: ANSWER_TYPE.none,
  welcome_screen: ANSWER_TYPE.none,
};

export function getPreviewAnswer(formFields: IFormField[]) {
  const filteredFields = formFields.filter(
    (val) =>
      !(
        val.type_id === SETTING_TYPE.welcome_screen ||
        val.type_id === SETTING_TYPE.thankyou_screen
      )
  );

  const mapAnswerField = new Map<string, IFieldAnswer>();

  filteredFields.forEach((val) => {
    const { _id, type_id } = val;
    const fieldAnswer = {
      answer_type: mapFieldAnswerType[type_id],
      boolean: null,
      choices: null,
      field_id: _id,
      field_type: type_id,
      number: null,
      text: null,
    };

    mapAnswerField.set(_id, fieldAnswer);
  });

  return mapAnswerField;
}

export function getSetAnswer(answerFieldData: Map<string, IFieldAnswer>) {
  const setUnanswered = new Set<string>();

  answerFieldData.forEach((_, key) => {
    setUnanswered.add(key);
  });

  return setUnanswered;
}

export function getInitialPhase(previewData: Preview) {
  let start_time = 0;
  let phaseType = PREVIEW_PHASE.start;

  if (previewData.getWelcomeScreen() === null) {
    start_time = +new Date();
    phaseType = PREVIEW_PHASE.content;
  }

  return {
    start_time,
    phaseType,
  };
}

export function searchNode(node: PreviewLinkedNode | null, field_id: string) {
  let currNode: PreviewLinkedNode | null = node;

  while (currNode !== null) {
    if (currNode.fieldData._id === field_id) {
      return currNode;
    }
    currNode = currNode.next;
  }

  return null;
}

export function getKeyByAnswerType(
  answer_type: ANSWER_TYPE
): keyof IFieldAnswer {
  switch (answer_type) {
    case ANSWER_TYPE.boolean:
      return 'boolean';

    case ANSWER_TYPE.choices:
      return 'choices';

    case ANSWER_TYPE.number:
      return 'number';

    case ANSWER_TYPE.text:
      return 'text';

    default:
      return 'text';
  }
}
