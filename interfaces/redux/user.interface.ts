export interface IWorkspace {
  workspace_name: string;
  _id: string;
  forms: string[];
  is_default: boolean;
}

export interface IUser {
  _id: string;
  provider_id: string;
  display_name: string;
  provider: string;
  email: string;
  email_verified: boolean;
  image: string;
  workspaces: IWorkspace[];
}

export interface IUserState {
  user: IUser | null;
  loading: boolean;
  error: string;
}

export interface IAction {
  type: USER_ACTION;
  payload: Partial<IUserState>;
}

export type USER_ACTION = 'STORE_USER' | 'SET_ERROR';
