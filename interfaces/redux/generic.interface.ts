export interface IGenericState {
  type: string;
  message: string;
}

export interface IGenericAction {
  type: GENERIC_ACTION;
  payload: Partial<IGenericState>;
}

export type GENERIC_ACTION = 'SET_GENERIC_MSG';
