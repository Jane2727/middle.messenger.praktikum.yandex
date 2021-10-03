import { v4 as uuidv4 } from 'uuid';
import homePageTemplate from './home.tmpl';
import RegistrationPage from './modules/registration/registration';
import './home.scss';
import LoginPage from './modules/login/login';
import Block from '../../utils/block';

export type THomePage = {
  isLogin?: boolean,
  content?: string,
}

export default class HomePage extends Block {
  constructor(context: THomePage, events = {}) {
    super('div', {
      context: {
        ...context,
        header: context.isLogin ? 'Вход' : 'Регистрация',
        content: context.isLogin ? new LoginPage().transformToString() : new RegistrationPage().transformToString(),
        id: uuidv4(),
      },
      template: homePageTemplate,
      events,
    });
  }
}
