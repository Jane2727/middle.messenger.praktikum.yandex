import AuthApi, { ILoginData, ISignUpData } from '../api/authApi';

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
      // знаю, что хранить данные в localStorage - это плохая идея
      // но из-за того, что при загрузке новой страницы приложение полностью инициализируется заново
      // Store тоже инициализируется заново
      // и соответственно все сохраненные в нём данные затираются
      // поэтому вместо store.setState({ user: res }); здесь localStorage.setItem()

      localStorage.setItem('user', JSON.stringify(res));
    }
    return res;
  }
}
