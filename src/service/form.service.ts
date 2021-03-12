import axios from 'axios';
import { IForm } from '../../interfaces/form/form.interface';
import { IPostStatus, IService } from './type.service';

async function getFormsWorkspace(
  formIds: string[]
): Promise<IService<IForm[]>> {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    const data = await axios.post<IService<IForm[]>>(
      'http://localhost:3001/api/form/bulk',
      { form_ids: formIds },
      {
        headers,
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
    const headers: any = {
      'Content-Type': 'application/json',
    };

    const data = await axios.post<IService<IPostStatus | null>>(
      'http://localhost:3001/api/form/create',
      {
        title,
        purpose,
        workspace_id,
      },
      {
        headers,
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
  token: string,
  form_id: string
): Promise<IService<IForm | null>> {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (typeof window !== 'undefined' && window.document && token) {
      window.document.cookie = `auth=${token}`;
    } else if (token) {
      headers['Cookie'] = `auth=${token}`;
    }

    const data = await axios.get<IService<IForm | null>>(
      'http://localhost:3001/api/form/' + form_id,
      {
        headers,
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
      data: null,
      error: err.message || 'Something went wrong',
    };
  }
}

export { getFormsWorkspace, createNewForm, getFormDetail };
