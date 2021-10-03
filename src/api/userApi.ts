import HTTPTransport from '../utils/HTTPTransport';
import { ISignUpData } from './authApi';

const defaultUrl = '/user';

const userAPIInstance = new HTTPTransport(defaultUrl);

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}

export default class UserApi {
  changeUserProfile(data: ISignUpData) {
    return userAPIInstance.put('/profile', data);
  }

  changeUserAvatar(data: FormData) {
    return userAPIInstance.put('/profile/avatar', data);
  }

  changeUserPassword(data: IPasswordData) {
    return userAPIInstance.put('/password', data);
  }
}
