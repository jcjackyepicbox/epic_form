import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  IForm,
  IFormField,
  IFormSetting,
  SETTING_TYPE,
} from '../../interfaces/form/form.interface';
import { IFormAction } from '../../interfaces/redux/form.interface';
import { getNewFormField } from '../../src/data/form.data';
import { getFormDetail } from '../../src/service/form.service';
import { ApplicationState } from '../reducers';
import { deepCopy } from '../../src/utils/deepCopy';

export function storeFormData(formData: IForm): IFormAction {
  return {
    type: 'STORE_FORM',
    payload: {
      formData,
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

export function getFormDataDetail(token: string, id: string) {
  return async (dispatch: any) => {
    const formData = await getFormDetail(token, id);

    if (!formData.status && formData.error) {
      dispatch(setError(formData.error));
    } else if (formData && formData.status && formData.data !== null) {
      dispatch(storeFormData(formData.data.formData));
      dispatch(storeFormSetting(formData.data.formSetting));
    }
  };
}

export function addQuestionField(
  type_id: SETTING_TYPE
): ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return async (dispatch: any) => {
    const newField = getNewFormField(type_id);
    dispatch(setFormField(newField));
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

export function updateFieldProperties(
  field_id: string,
  property: keyof IFormField['properties'],
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
