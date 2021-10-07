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

  changeUserAvatar(avatar: FormData) {
    return userAPIInstance.put('/profile/avatar', avatar);
  }

  changeUserPassword(data: IPasswordData) {
    return userAPIInstance.put('/password', data);
  }
}
