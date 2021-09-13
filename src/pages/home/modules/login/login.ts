import * as Handlebars from 'handlebars';
import loginTemplate from './login.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import './login.scss';
import { Form } from '../../../../components/form';
import { checkValidation, checkAndCollectData } from '../../../../utils/checkValidation';

export function login() {
  const template = Handlebars.compile(loginTemplate);

  const loginInput = new Input({
    name: 'login',
    label: 'Логин',
    type: 'text',
    required: true,
    dataType: 'login',
    errorMessage: 'Неверный логин',
  },
  {
    focus: (event: Event) => {
      checkValidation({ event });
    },
    blur: (event: Event) => {
      checkValidation({ event });
    },
  });

  const passwordInput = new Input({
    name: 'password',
    label: 'Пароль',
    type: 'password',
    required: true,
    dataType: 'password',
    errorMessage: 'Неверный пароль',
  },
  {
    focus: (event: Event) => {
      checkValidation({ event });
    },
    blur: (event: Event) => {
      checkValidation({ event });
    },
  });

  const button = new Button({
    title: 'Авторизоваться',
  });

  const context = {
    inputs: [loginInput.transformToString(), passwordInput.transformToString()],
    button: button.transformToString(),
    linkTitle: 'Нет аккаунта?',
  };

  const form = new Form(
    {
      children: {
        inputs: [loginInput, passwordInput],
        button,
      },
      content: template(context),
    }, {
      submit: (event: Event) => {
        checkAndCollectData(event, '/notSelectedChat');
      },
    },
  );

  return form.transformToString();
}
