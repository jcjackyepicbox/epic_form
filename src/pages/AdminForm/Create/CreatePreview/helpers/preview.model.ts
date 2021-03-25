import {
  IForm,
  IFormField,
  SETTING_TYPE,
} from '../../../../../../interfaces/form/form.interface';

class PreviewLinkedNode {
  next: PreviewLinkedNode | null = null;
  fieldData: IFormField;

  constructor(fieldData: IFormField) {
    this.fieldData = fieldData;
    this.next = null;
  }

  setNext(node: PreviewLinkedNode) {
    this.next = node;
  }
}

class Preview {
  // basically HEAD node, don't change HEAD directly when iterating
  public previewNode: PreviewLinkedNode | null = null;
  public formData: IForm;

  constructor(formData: IForm) {
    this.formData = formData;
    const welcomeScreenField = this.getWelcomeScreen();

    if (welcomeScreenField !== null) {
      // if welcome screen exists then only take welcome screen until start button clicked.
      const wsNode = new PreviewLinkedNode(welcomeScreenField);
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

  setLinkedPreviewFields() {
    const { fields } = this.formData;

    // set next ref
    let currNode: PreviewLinkedNode | null = null;
    for (let i = fields.length - 1; i >= 0; i--) {
      const fieldNode = new PreviewLinkedNode(fields[i]);
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
}

export { Preview, PreviewLinkedNode };
