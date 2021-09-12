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
      errorMessage: 'Почта должна быть написана на латинице, допускаются цифры и спецсимволы',
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
      errorMessage: 'Логин должен быть от 3 до 20 символов, написан латиницей, допускаются цифры, дефис и нижнее подчёркивание.',
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
      errorMessage: 'Имя должно быть написано на латинице или кириллице, первая буква заглавная, без цифр и спецсимволов',
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
      errorMessage: 'Фамилия должна быть написана на латинице или кириллице, первая буква заглавная, без цифр и спецсимволов',
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
      errorMessage: 'Телефон должен быть от 10 до 15 символов, состоять из цифр, может начинается с плюса.',
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
      errorMessage: 'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра',
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
      errorMessage: 'Введенные пароли не совпадают',
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
