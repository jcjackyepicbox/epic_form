import { IAction, IUser } from '../../interfaces/redux/user.interface';
import { getUserDashboard } from '../../src/service/user.service';

export function storeUser(user: IUser): IAction {
  return {
    type: 'STORE_USER',
    payload: {
      user: user,
    },
  };
}

export function setError(error: string): IAction {
  return {
    type: 'SET_ERROR',
    payload: {
      error: error,
    },
  };
}

export function getUserWorkspace(token: string) {
  return async (dispatch: any) => {
    const userData = await getUserDashboard(token);
    console.log(userData);
    if (!userData.status && userData.error) {
      dispatch(setError(userData.error));
    } else if (userData.status && userData.data) {
      dispatch(storeUser(userData.data));
    }
  };
}
