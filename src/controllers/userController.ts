import { ISignUpData } from '../api/authApi';
import UserApi, { IPasswordData } from '../api/userApi';
import LoginController from './loginController';

const userInstance = new UserApi();
const loginController = new LoginController();

class UserController {
  public async changeUserProfile(data: ISignUpData) {
    try {
      await userInstance.changeUserProfile(data);
      await loginController.getUser();
    } catch (e) {
      return e.reason;
    }
  }

  public async changeUserAvatar(data: FormData) {
    try {
      await userInstance.changeUserAvatar(data);
      await loginController.getUser();
    } catch (e) {
      return e.reason;
    }
  }

  public async changeUserPassword(data: IPasswordData) {
    try {
      await userInstance.changeUserPassword(data);
      await loginController.getUser();
    } catch (e) {
      return e.reason;
    }
  }
}

export default UserController;
