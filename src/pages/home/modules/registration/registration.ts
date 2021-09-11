import * as Handlebars from 'handlebars';
import registrationTemplate from './registration.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import './registration.scss';
import { Form } from '../../../../components/form';
import { checkAndCollectData, checkValidation } from '../../../../utils';

export function registration() {
  const template = Handlebars.compile(registrationTemplate);

  const inputs = [
    new Input({
      name: 'email',
      label: 'Почта',
      type: 'text',
      required: true,
      dataType: 'email',
      errorMessage: 'Неверный формат',
    }, {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    }),
    new Input({
      name: 'login',
      label: 'Логин',
      type: 'text',
      required: true,
      dataType: 'login',
      errorMessage: 'Неверный формат',
    }, {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    }),
    new Input({
      name: 'name',
      label: 'Имя',
      type: 'text',
      required: false,
      dataType: 'name',
      errorMessage: 'Неверный формат',
    }, {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    }),
    new Input({
      name: 'lastName',
      label: 'Фамилия',
      type: 'text',
      required: false,
      dataType: 'name',
      errorMessage: 'Неверный формат',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    }),
    new Input({
      name: 'phone',
      label: 'Телефон',
      type: 'text',
      required: false,
      dataType: 'phone',
      errorMessage: 'Неверный формат',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    }),
    new Input({
      name: 'password',
      label: 'Пароль',
      type: 'password',
      required: true,
      dataType: 'password',
      errorMessage: 'Неверный формат',
    }, {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    }),
    new Input({
      name: 'secondPassword',
      label: 'Пароль (ещё раз)',
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
    }),
  ];

  const button = new Button({
    title: 'Зарегистрироваться',
  });

  const context = {
    inputs: inputs.map((input) => input.transformToString()),
    button: button.transformToString(),
    linkTitle: 'Войти',
  };

  const form = new Form(
    {
      children: {
        inputs,
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
