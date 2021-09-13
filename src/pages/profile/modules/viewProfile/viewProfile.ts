import * as Handlebars from 'handlebars';
import viewProfileTemplate from './viewProfile.tmpl';
import { Input } from '../../../../components/input';
import './viewProfile.scss';

export function viewProfile() {
  const template = Handlebars.compile(viewProfileTemplate);

  const inputs = [
    new Input({
      value: 'pochta@yandex.ru',
      name: 'email',
      label: 'Почта',
      type: 'text',
      required: true,
      disabled: true,
      isProfileInput: true,
    }),
    new Input({
      value: 'john',
      name: 'login',
      label: 'Логин',
      type: 'text',
      required: true,
      disabled: true,
      isProfileInput: true,
    }),
    new Input({
      value: 'john',
      name: 'name',
      label: 'Имя',
      type: 'text',
      required: false,
      disabled: true,
      isProfileInput: true,
    }),
    new Input({
      value: 'doe',
      name: 'lastName',
      label: 'Фамилия',
      type: 'text',
      required: false,
      disabled: true,
      isProfileInput: true,
    }),
    new Input({
      value: '+76667776655',
      name: 'phone',
      label: 'Телефон',
      type: 'text',
      required: false,
      disabled: true,
      isProfileInput: true,
    }),
    new Input({
      value: 'john',
      name: 'nickname',
      label: 'Имя в чате',
      type: 'text',
      disabled: true,
      isProfileInput: true,
    }),
  ];

  const context = {
    inputs: inputs.map((input) => input.transformToString()),
    changeData: 'Изменить данные',
    changePassword: 'Изменить пароль',
    back: 'Выйти',
  };

  return template(context);
}
