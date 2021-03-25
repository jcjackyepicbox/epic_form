import {
  IFormField,
  SETTING_TYPE,
} from '../../../../../../interfaces/form/form.interface';
import { PreviewLinkedNode } from './preview.model';
import { ANSWER_TYPE, IFieldAnswer } from './preview.types';

export const mapFieldAnswerType: Record<SETTING_TYPE, ANSWER_TYPE> = {
  multiple_choice: ANSWER_TYPE.choices,
  number: ANSWER_TYPE.number,
  short_text: ANSWER_TYPE.text,
  yes_no: ANSWER_TYPE.boolean,
  thankyou_screen: ANSWER_TYPE.none,
  welcome_screen: ANSWER_TYPE.none,
};

export function getPreviewAnswer(formFields: IFormField[]): IFieldAnswer[] {
  const filteredFields = formFields.filter(
    (val) =>
      !(
        val.type_id === SETTING_TYPE.welcome_screen ||
        val.type_id === SETTING_TYPE.thankyou_screen
      )
  );

  return filteredFields.map((val) => {
    return {
      answer_type: mapFieldAnswerType[val.type_id],
      boolean: null,
      choices: null,
      field_id: val._id,
      field_type: val.type_id,
      number: null,
      text: null,
    };
  });
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
