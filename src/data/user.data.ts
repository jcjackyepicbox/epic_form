import { IUser } from '../../interfaces/redux/user.interface';

export const defaultUserData: IUser = {
  _id: '',
  display_name: '',
  email: '',
  email_verified: false,
  image: '',
  provider: '',
  provider_id: '',
  workspaces: [],
};
