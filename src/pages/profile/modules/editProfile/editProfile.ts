import * as Handlebars from 'handlebars';
import editProfileTemplate from './editProfile.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { routes } from '../../../../utils/constants';
import './editProfile.scss';
import { Form } from '../../../../components/form';
import { checkAndCollectData, checkValidation } from '../../../../utils';

export function editProfile(route: string) {
  const template = Handlebars.compile(editProfileTemplate);

  const isEditPassword = route === routes.editProfilePassword;

  const profileInputs = {
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
        errorMessage: 'Неверный формат',
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
        errorMessage: 'Неверный пароль',
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
        errorMessage: 'Неверный формат',
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
        errorMessage: 'Неверный формат',
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
        value: 'john',
        name: 'lastName',
        label: 'Фамилия',
        type: 'text',
        required: false,
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
        errorMessage: 'Неверный формат',
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

  const inputs = profileInputs[isEditPassword ? 'passwordInputs' : 'profileDataInputs'];

  const context = {
    inputs: inputs.map((input) => input.transformToString()),
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
