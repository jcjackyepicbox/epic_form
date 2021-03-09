import { combineReducers } from 'redux';
import { IGenericState } from '../../interfaces/redux/generic.interface';
import { IUserState } from '../../interfaces/redux/user.interface';
import user from './user';
import generic from './generic';

export interface ApplicationState {
  user: IUserState;
  generic: IGenericState;
}

const getReducers = () => {
  return combineReducers<ApplicationState>({
    user: user,
    generic: generic,
  });
};

export default getReducers;
