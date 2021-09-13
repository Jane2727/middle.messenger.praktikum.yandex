import * as Handlebars from 'handlebars';
import editProfileTemplate from './editProfile.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import './editProfile.scss';
import { Form } from '../../../../components/form';
import { checkAndCollectData, checkValidation } from '../../../../utils';
import { Dictionary } from '../../../../utils/block';

export function editProfile(profileType: string) {
  const template = Handlebars.compile(editProfileTemplate);

  const profileInputs: Dictionary = {
    passwordInputs: [
      new Input({
        name: 'password',
        label: 'Старый пароль',
        type: 'password',
        required: true,
        errorMessage: 'Неверный пароль',
        dataType: 'password',
        isProfileInput: true,
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
        name: 'secondPassword',
        label: 'Новый пароль',
        type: 'password',
        required: true,
        errorMessage: 'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра',
        dataType: 'password',
        isProfileInput: true,
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
        label: 'Повторите новый пароль',
        type: 'password',
        required: true,
        errorMessage: 'Введенные пароли не совпадают',
        dataType: 'password',
        isProfileInput: true,
      }, {
        focus: (event: Event) => {
          checkValidation({ event });
        },
        blur: (event: Event) => {
          checkValidation({ event });
        },
      }),
    ],
    profileDataInputs: [
      new Input({
        value: 'pochta@yandex.ru',
        name: 'email',
        label: 'Почта',
        type: 'text',
        required: true,
        disabled: false,
        errorMessage: 'Почта должна быть написана на латинице, допускаются цифры и спецсимволы',
        dataType: 'email',
        isProfileInput: true,
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
        value: 'john',
        name: 'login',
        label: 'Логин',
        type: 'text',
        required: true,
        disabled: false,
        errorMessage: 'Логин должен быть от 3 до 20 символов, написан латиницей, допускаются цифры, дефис и нижнее подчёркивание.',
        dataType: 'login',
        isProfileInput: true,
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
        value: 'john',
        name: 'name',
        label: 'Имя',
        type: 'text',
        required: false,
        disabled: false,
        errorMessage: 'Имя должно быть написано на латинице или кириллице, первая буква заглавная, без цифр и спецсимволов',
        dataType: 'name',
        isProfileInput: true,
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
        value: 'john',
        name: 'lastName',
        label: 'Фамилия',
        type: 'text',
        required: false,
        disabled: false,
        errorMessage: 'Фамилия должна быть написана на латинице или кириллице, первая буква заглавная, без цифр и спецсимволов',
        dataType: 'name',
        isProfileInput: true,
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
        value: 'john',
        name: 'nickname',
        label: 'Имя в чате',
        type: 'text',
        disabled: false,
        errorMessage: 'Неверный формат',
        dataType: 'name',
        isProfileInput: true,
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
        value: '+76667776655',
        name: 'phone',
        label: 'Телефон',
        type: 'text',
        required: false,
        disabled: false,
        errorMessage: 'Телефон должен быть от 10 до 15 символов, состоять из цифр, может начинается с плюса.',
        dataType: 'phone',
        isProfileInput: true,
      },
      {
        focus: (event: Event) => {
          checkValidation({ event });
        },
        blur: (event: Event) => {
          checkValidation({ event });
        },
      }),
    ],
  };

  const save = new Button({
    title: 'Сохранить',
  });

  const back = new Button({
    title: 'Назад',
  });

  const inputs = profileInputs[profileType];

  const context = {
    inputs: inputs.map((input: Dictionary) => input.transformToString()),
    save: save.transformToString(),
    back: back.transformToString(),
  };

  const form = new Form(
    {
      children: {
        inputs,
        button: save,
      },
      content: template(context),
    }, {
      submit: (event: Event) => {
        checkAndCollectData(event, '/viewProfile');
      },
    },
  );

  return form.transformToString();
}
