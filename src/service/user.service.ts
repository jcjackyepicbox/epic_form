import axios from 'axios';
import { IUser } from '../../interfaces/redux/user.interface';
import { IService } from './type.service';

async function getUserDashboard(
  token: string
): Promise<IService<IUser | null>> {
  try {
    if (document && token) {
      document.cookie = `auth=${token}`;
    }

    const data = await axios.get<IService<IUser | null>>(
      'http://localhost:3001/api/user/workspace',
      {
        headers: {
          'Content-Type': 'application/json',
        },
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
    return {
      status: false,
      data: null,
      error: err.message || 'Something went wrong',
    };
  }
}

export { getUserDashboard };
