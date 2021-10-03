import * as Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import registrationTemplate from './registration.tmpl';
import './registration.scss';
import { checkAndCollectData, checkValidation } from '../../../../utils';
import Block from '../../../../utils/block';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import Form from '../../../../components/form/form';
import LoginController from '../../../../controllers/loginController';

const controller = new LoginController();

const getTemplate = () => {
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
      name: 'first_name',
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
      name: 'second_name',
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
      name: 'password',
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
      submit: async (event: CustomEvent) => {
        await checkAndCollectData(event, '/messenger', controller, 'signUp');
      },
    },
  );

  return form.transformToString();
};

export default class RegistrationPage extends Block {
  constructor(context = {}, events = {}) {
    super('div', {
      context: {
        ...context,
        id: uuidv4(),
      },
      template: getTemplate(),
      events,
    });
  }
}
