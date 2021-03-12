import { IForm } from '../../interfaces/form/form.interface';
import { IFormAction } from '../../interfaces/redux/form.interface';
import { getFormDetail } from '../../src/service/form.service';
export function storeFormData(formData: IForm): IFormAction {
  return {
    type: 'STORE_FORM',
    payload: {
      formData,
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

    console.log('DATA', formData);

    if (!formData.status && formData.error) {
      dispatch(setError(formData.error));
    } else if (formData.status && formData.data) {
      dispatch(storeFormData(formData.data));
    }
  };
}
