import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  IChoiceForm,
  IForm,
  IFormField,
  IFormSetting,
  SETTING_TYPE,
} from '../../interfaces/form/form.interface';
import { IFormAction } from '../../interfaces/redux/form.interface';
import { getFormDetail } from '../../src/service/form.service';
import { ApplicationState } from '../reducers';
import { deepCopy } from '../../src/utils/deepCopy';

export function storeFormData(formData: IForm): IFormAction {
  return {
    type: 'STORE_FORM',
    payload: {
      formData,
      loading: false,
    },
  };
}

export function setLoading(): IFormAction {
  return {
    type: 'SET_FORM_LOADING',
    payload: {
      loading: true,
    },
  };
}

export function storeFormSetting(formSetting: IFormSetting[]): IFormAction {
  return {
    type: 'STORE_SETTING',
    payload: {
      formSetting,
    },
  };
}

export function setFormField(field: IFormField): IFormAction {
  return {
    type: 'SET_FORM_FIELDS',
    payload: {
      field,
    },
  };
}

export function setAllFormField(fields: IFormField[]): IFormAction {
  return {
    type: 'SET_ALL_FORM_FIELDS',
    payload: {
      fields,
    },
  };
}

export function setError(error: string): IFormAction {
  return {
    type: 'SET_ERROR',
    payload: {
      error: error,
    },
  };
}

export function getFormDataDetail(ctx: any, params: any) {
  return async (dispatch: any) => {
    dispatch(setLoading());
    const formData = await getFormDetail(ctx, params);

    if (!formData.status && formData.error) {
      dispatch(setError(formData.error));
    } else if (formData && formData.status && formData.data !== null) {
      dispatch(storeFormData(formData.data.formData));
      dispatch(storeFormSetting(formData.data.formSetting));
    }
  };
}

export function addQuestionField(
  newField: IFormField
): ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return async (dispatch: any, getState) => {
    const formData = getState().form.formData;
    const { fields } = formData;

    const cloneFields: IFormField[] = deepCopy(fields);
    cloneFields.push(newField);

    const welcomeScreenField = cloneFields.filter(
      (val) => val.type_id === SETTING_TYPE.welcome_screen
    );
    const thankyouScreenField = cloneFields.filter(
      (val) => val.type_id === SETTING_TYPE.thankyou_screen
    );

    const restScreenField = cloneFields.filter(
      (val) =>
        val.type_id !== SETTING_TYPE.welcome_screen &&
        val.type_id !== SETTING_TYPE.thankyou_screen
    );

    dispatch(
      setAllFormField([
        ...welcomeScreenField,
        ...restScreenField,
        ...thankyouScreenField,
      ])
    );
  };
}

export function updateFieldTitle(
  field_id: string,
  value: string
): ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return async (dispatch: any, getState) => {
    const formData = getState().form.formData;
    const { fields } = formData;

    const cloneFields: IFormField[] = deepCopy(fields);

    for (let field of cloneFields) {
      if (field._id === field_id) {
        field['title'] = value;
      }
    }

    dispatch(setAllFormField(cloneFields));
  };
}

export function deleteField(
  field_id: string
): ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return async (dispatch: any, getState) => {
    const formData = getState().form.formData;
    const { fields } = formData;

    const filteredFields: IFormField[] = fields.filter(
      (val) => val._id !== field_id
    );

    dispatch(setAllFormField(filteredFields));
  };
}

export function updateFieldProperties(
  field_id: string,
  property: Exclude<keyof IFormField['properties'], 'choices'>,
  value: string | null
): ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return async (dispatch: any, getState) => {
    const formData = getState().form.formData;
    const { fields } = formData;

    const cloneFields: IFormField[] = deepCopy(fields);

    for (let field of cloneFields) {
      if (field._id === field_id) {
        field['properties'][property] = value;
      }
    }

    dispatch(setAllFormField(cloneFields));
  };
}

export function updateChoiceFieldProperties(
  field_id: string,
  choice_id: string,
  label: string
): ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return async (dispatch: any, getState) => {
    const formData = getState().form.formData;
    const { fields } = formData;

    const cloneFields: IFormField[] = deepCopy(fields);

    for (let field of cloneFields) {
      if (field._id === field_id) {
        field.properties.choices = field.properties.choices.map((val) => {
          if (val._id === choice_id) {
            return {
              ...val,
              label: label,
            };
          }

          return val;
        });
      }
    }

    dispatch(setAllFormField(cloneFields));
  };
}

export function addChoiceFieldProperties(
  field_id: string,
  new_choice: IChoiceForm
): ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return async (dispatch: any, getState) => {
    const formData = getState().form.formData;
    const { fields } = formData;

    const cloneFields: IFormField[] = deepCopy(fields);

    for (let field of cloneFields) {
      if (field._id === field_id) {
        field.properties.choices.push(new_choice);
      }
    }

    dispatch(setAllFormField(cloneFields));
  };
}

export function deleteChoiceFieldProperties(
  field_id: string,
  choice_id: string
): ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return async (dispatch: any, getState) => {
    const formData = getState().form.formData;
    const { fields } = formData;

    const cloneFields: IFormField[] = deepCopy(fields);

    for (let field of cloneFields) {
      if (field._id === field_id) {
        field.properties.choices = field.properties.choices.filter(
          (val) => val._id !== choice_id
        );
      }
    }

    dispatch(setAllFormField(cloneFields));
  };
}
