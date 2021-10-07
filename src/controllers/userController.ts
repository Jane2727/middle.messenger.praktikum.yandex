import { ISignUpData } from '../api/authApi';
import UserApi, { IPasswordData } from '../api/userApi';
import store from '../store';
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

  public async changeUserAvatar(file: File, image: HTMLImageElement) {
    try {
      const data = new FormData();
      data.append('avatar', file, `avatar.${file.type.split('/')[1]}`);
      await userInstance.changeUserAvatar(data);
      this.updateImage(file, image);
      await loginController.getUser();
    } catch (e) {
      return e.reason;
    }
  }

  public updateImage(file: File, image: HTMLImageElement) {
    const reader = new FileReader();

    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      image.src = base64 as string;
      store.setStateAndPersist({ avatarIcon: base64 }, true);
    };

    reader.readAsDataURL(file);
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
