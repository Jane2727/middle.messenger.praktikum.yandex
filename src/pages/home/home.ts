import * as Handlebars from 'handlebars';
import homePageTemplate from './home.tmpl';
import { login } from './modules/login';
import { registration } from './modules/registration';
import { routes } from '../../utils';
import './home.scss';

export function homePage(route: string) {
  const template = Handlebars.compile(homePageTemplate);
  const isLogin = route === routes.login;

  const context = {
    header: isLogin ? 'Вход' : 'Регистрация',
    content: isLogin ? login : registration,
  };

  return template(context);
}
