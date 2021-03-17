import axios from 'axios';
import { IUser } from '../../interfaces/redux/user.interface';
import AuthAxiosInstance from '../utils/axios.utils';
import { IPostStatus, IService } from './type.service';

async function getUserDashboard(ctx: any): Promise<IService<IUser | null>> {
  try {
    const authAxios = AuthAxiosInstance.getInstance(
      ctx?.cookies?.auth || ''
    ).getAuthAxiosInstance();

    const data = await authAxios.get<IService<IUser | null>>(
      'http://localhost:3001/api/user/workspace',
      {
        withCredentials: true,
      }
    );

    const serviceData = data.data;

    if (serviceData && serviceData.error) {
      throw new Error(serviceData.error);
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

async function createNewWorkspace(
  title: string
): Promise<IService<IPostStatus | null>> {
  try {
    const data = await axios.post<IService<IPostStatus | null>>(
      'http://localhost:3001/api/user/workspace',
      {
        title,
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

async function updateWorkspace(
  title: string,
  workspace_id: string
): Promise<IService<IPostStatus | null>> {
  try {
    const data = await axios.put<IService<IPostStatus | null>>(
      'http://localhost:3001/api/user/workspace',
      {
        title,
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

async function deleteWorkspace(
  workspace_id: string
): Promise<IService<IPostStatus | null>> {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    const data = await axios.delete<IService<IPostStatus | null>>(
      'http://localhost:3001/api/user/workspace',
      {
        headers,
        withCredentials: true,
        data: {
          workspace_id,
        },
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

export {
  getUserDashboard,
  createNewWorkspace,
  updateWorkspace,
  deleteWorkspace,
};
