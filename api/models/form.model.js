class FormModel {
  constructor() {}

  createDefaultForm(title, purpose) {
    this.title = title;
    this.purpose = purpose;
    this.fields = [];
  }

  getProperties() {
    return {
      title: this.title,
      purpose: this.purpose,
      fields: this.fields,
    };
  }
}

export default FormModel;
