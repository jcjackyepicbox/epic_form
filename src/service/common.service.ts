import axios from 'axios';
import { ITodo } from '../../interfaces/redux/todo.interface';
import { IService } from './type.service';

async function getHomeData(): Promise<IService<ITodo[]>> {
  try {
    const data = await axios.get<ITodo[]>(
      'https://jsonplaceholder.typicode.com/todos',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      status: true,
      data: data.data,
    };
  } catch (err) {
    return {
      status: false,
      data: [],
      message: err.message || 'Something went wrong',
    };
  }
}

export { getHomeData };
