import * as Handlebars from 'handlebars';
import registrationTemplate from './registration.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import './registration.scss';

export function registration() {
  const template = Handlebars.compile(registrationTemplate);

  const context = {
    inputs: [
      Input({
        name: 'mail',
        label: 'Почта',
        type: 'text',
        required: true,
      }),
      Input({
        name: 'login',
        label: 'Логин',
        type: 'text',
        required: true,
      }),
      Input({
        name: 'name',
        label: 'Имя',
        type: 'text',
        required: false,
      }),
      Input({
        name: 'lastName',
        label: 'Фамилия',
        type: 'text',
        required: false,
      }),
      Input({
        name: 'phone',
        label: 'Телефон',
        type: 'text',
        required: false,
      }),
      Input({
        name: 'password',
        label: 'Пароль',
        type: 'password',
        required: true,
      }),
      Input({
        name: 'secondPassword',
        label: 'Пароль (ещё раз)',
        type: 'password',
        required: true,
        errorMessage: 'Неверный пароль',
      }),
    ],
    button: Button({
      title: 'Зарегистрироваться',
    }),
    linkTitle: 'Войти',
  };

  return template(context);
}
