import AuthApi, { ILoginData, ISignUpData } from '../api/authApi';
import store from '../store';

const authInstance = new AuthApi();

export default class LoginController {
  public async login(data: ILoginData) {
    try {
      await authInstance.signIn(data);
      await this.getUser();
    } catch (e) {
      return e.reason;
    }
  }

  public async signUp(data: ISignUpData) {
    try {
      await authInstance.signUp(data);
      await this.getUser();
    } catch (e) {
      return e.reason;
    }
  }

  public async logOut() {
    try {
      await authInstance.logOut();
    } catch (e) {
      return e.reason;
    }
  }

  public async getUser() {
    let res;
    try {
      res = await authInstance.getUser();
    } catch (e) {
      res = e.reason;
    }
    if (res !== 'Not found') {
      store.setStateAndPersist({ user: res });
    }
    return res;
  }
}
