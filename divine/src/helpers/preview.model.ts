import { IForm, IFormField, SETTING_TYPE } from '../interfaces/index.interface';
import { IFieldAnswer } from './preview.types';

class PreviewLinkedNode {
  next: PreviewLinkedNode | null = null;
  fieldData: IFormField;
  answerData: IFieldAnswer | null = null;

  constructor(fieldData: IFormField, answerData: IFieldAnswer | null) {
    this.fieldData = fieldData;
    this.next = null;
    this.answerData = answerData;
  }

  setNext(node: PreviewLinkedNode) {
    this.next = node;
  }
}

class Preview {
  // basically HEAD node, don't change HEAD directly when iterating
  public previewNode: PreviewLinkedNode | null = null;
  public formData: IForm;

  // initial Answer Data to be mapped when filling start
  public answersData: Map<string, IFieldAnswer>;

  constructor(formData: IForm, answersData: Map<string, IFieldAnswer>) {
    this.formData = formData;
    this.answersData = answersData;
    const welcomeScreenField = this.getWelcomeScreen();

    if (welcomeScreenField !== null) {
      // if welcome screen exists then only take welcome screen until start button clicked.
      const wsNode = new PreviewLinkedNode(welcomeScreenField, null);
      this.previewNode = wsNode;
    } else {
      this.setLinkedPreviewFields();
    }
  }

  getWelcomeScreen() {
    const { fields } = this.formData;
    const filteredFields = fields.filter(
      (val) => val.type_id === SETTING_TYPE.welcome_screen
    );

    if (filteredFields.length > 0) {
      return filteredFields[0];
    }

    return null;
  }

  getThankyouScreen() {
    const { fields } = this.formData;
    const filteredFields = fields.filter(
      (val) => val.type_id === SETTING_TYPE.thankyou_screen
    );

    if (filteredFields.length > 0) {
      return filteredFields[0];
    }

    return null;
  }

  setLinkedPreviewFields() {
    const { fields } = this.formData;

    // filtered thankyou screen
    const filteredFields = fields.filter(
      (val) => val.type_id !== SETTING_TYPE.thankyou_screen
    );

    // set next ref
    let currNode: PreviewLinkedNode | null = null;
    for (let i = filteredFields.length - 1; i >= 0; i--) {
      const fieldAnswer = this.answersData.get(filteredFields[i]._id) || null;
      const fieldNode = new PreviewLinkedNode(filteredFields[i], fieldAnswer);
      if (currNode === null) {
        currNode = fieldNode;
      } else {
        fieldNode.setNext(currNode);
        currNode = fieldNode;
      }
    }

    // set to head
    this.previewNode = currNode;
  }

  setThankyouScreen() {
    const thankyouScreen =
      this.getThankyouScreen() || this.defaultThankyouScreen();

    const thankyouNode = new PreviewLinkedNode(thankyouScreen, null);

    this.previewNode = thankyouNode;
  }

  defaultThankyouScreen(): IFormField {
    return {
      _id: '',
      properties: {
        button_text: 'Join now',
        choices: [],
        description:
          'Join epicform to start creating your own forms and survey. Everything is free',
      },
      title: 'Thank You',
      type_id: SETTING_TYPE.thankyou_screen,
    };
  }
}

export { Preview, PreviewLinkedNode };
