import axios from 'axios';
import {
  IForm,
  IFormField,
  IFormSetting,
} from '../../interfaces/form/form.interface';
import AuthAxiosInstance from '../utils/axios.utils';
import { IPostStatus, IService } from './type.service';

async function getFormsWorkspace(
  formIds: string[]
): Promise<IService<IForm[]>> {
  try {
    const data = await axios.post<IService<IForm[]>>(
      'http://localhost:3001/api/form/bulk',
      { form_ids: formIds },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    const formsData = data.data;

    if (formsData && formsData.error) {
      throw new Error(formsData.error);
    }

    return {
      status: true,
      data: formsData.data,
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      data: [],
      error: err.message || 'Something went wrong',
    };
  }
}

async function createNewForm(
  title: string,
  purpose: string,
  workspace_id: string
): Promise<IService<IPostStatus | null>> {
  try {
    const data = await axios.post<IService<IPostStatus | null>>(
      'http://localhost:3001/api/form/create',
      {
        title,
        purpose,
        workspace_id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    const serviceData = data.data;

    if (serviceData.status === false && serviceData.error) {
      return serviceData;
    }

    return {
      status: true,
      data: serviceData.data,
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      data: null,
      error: err.message || 'Something went wrong',
    };
  }
}

async function getFormDetail(
  ctx: any,
  params: any
): Promise<IService<{ formData: IForm; formSetting: IFormSetting[] } | null>> {
  try {
    const authAxios = AuthAxiosInstance.getInstance(
      ctx?.cookies?.auth || ''
    ).getAuthAxiosInstance();
    const form_id = params?.id || '';

    const data = await authAxios.get<
      IService<{ formData: IForm; formSetting: IFormSetting[] } | null>
    >('http://localhost:3001/api/form/' + form_id, {
      withCredentials: true,
    });

    const formsData = data.data;

    if (formsData && formsData.error) {
      throw new Error(formsData.error);
    }

    return {
      status: true,
      data: formsData.data,
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      data: null,
      error: err.message || 'Something went wrong',
    };
  }
}

async function updateFormField(
  form_id: string,
  fields: IFormField[]
): Promise<IService<IPostStatus | null>> {
  try {
    const data = await axios.put<IService<IPostStatus | null>>(
      'http://localhost:3001/api/form/field',
      {
        form_id,
        fields,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    const serviceData = data.data;

    if (serviceData.status === false && serviceData.error) {
      return serviceData;
    }

    return {
      status: true,
      data: serviceData.data,
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      data: null,
      error: err.message || 'Something went wrong',
    };
  }
}

export { getFormsWorkspace, createNewForm, getFormDetail, updateFormField };
