import * as Handlebars from 'handlebars';
import editProfileTemplate from './editProfile.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { routes } from '../../../../utils/constants';
import './editProfile.scss';

export function editProfile(route: string) {
  const template = Handlebars.compile(editProfileTemplate);

  const isEditPassword = route === routes.editProfilePassword;

  const inputs = {
    passwordInputs: [
      Input({
        name: 'password',
        label: 'Старый пароль',
        type: 'password',
        required: true,
        errorMessage: 'Неверный пароль',
        isProfileInput: true,
      }),
      Input({
        name: 'secondPassword',
        label: 'Новый пароль',
        type: 'password',
        required: true,
        errorMessage: 'Неверный пароль',
        isProfileInput: true,
      }),
      Input({
        name: 'secondPassword',
        label: 'Повторите новый пароль',
        type: 'password',
        required: true,
        errorMessage: 'Неверный пароль',
        isProfileInput: true,
      }),
    ],
    profileDataInputs: [
      Input({
        value: 'pochta@yandex.ru',
        name: 'mail',
        label: 'Почта',
        type: 'text',
        required: true,
        disabled: false,
        isProfileInput: true,
      }),
      Input({
        value: 'john',
        name: 'login',
        label: 'Логин',
        type: 'text',
        required: true,
        disabled: false,
        isProfileInput: true,
      }),
      Input({
        value: 'john',
        name: 'name',
        label: 'Имя',
        type: 'text',
        required: false,
        disabled: false,
        isProfileInput: true,
      }),
      Input({
        value: 'john',
        name: 'lastName',
        label: 'Фамилия',
        type: 'text',
        required: false,
        disabled: false,
        isProfileInput: true,
      }),
      Input({
        value: 'john',
        name: 'nickname',
        label: 'Имя в чате',
        type: 'text',
        disabled: false,
        isProfileInput: true,
      }),
      Input({
        value: '7777777',
        name: 'phone',
        label: 'Телефон',
        type: 'text',
        required: false,
        disabled: false,
        isProfileInput: true,
      }),
    ],
  };

  const context = {
    inputs: inputs[isEditPassword ? 'passwordInputs' : 'profileDataInputs'],
    save: Button({
      title: 'Сохранить',
    }),
    back: Button({
      title: 'Назад',
    }),
  };

  return template(context);
}
