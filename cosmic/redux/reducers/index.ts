import { combineReducers } from 'redux';
import { IGenericState } from '../../interfaces/redux/generic.interface';
import { IUserState } from '../../interfaces/redux/user.interface';
import user from './user';
import generic from './generic';
import form from './form';
import { IFormState } from '../../interfaces/redux/form.interface';

export interface ApplicationState {
  user: IUserState;
  generic: IGenericState;
  form: IFormState;
}

const getReducers = () => {
  return combineReducers<ApplicationState>({
    user: user,
    generic: generic,
    form: form,
  });
};

export default getReducers;
