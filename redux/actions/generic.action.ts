import { IGenericAction } from '../../interfaces/redux/generic.interface';

export function setGenericMsg(type: string, msg: string): IGenericAction {
  return {
    type: 'SET_GENERIC_MSG',
    payload: {
      type,
      message: msg,
    },
  };
}
