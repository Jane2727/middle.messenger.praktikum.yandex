import * as Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import viewProfileTemplate from './viewProfile.tmpl';
import './viewProfile.scss';
import Block from '../../../../utils/block';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import LoginController from '../../../../controllers/loginController';
import router from '../../../../router';

const controller = new LoginController();

const getTemplate = () => {
  const template = Handlebars.compile(viewProfileTemplate);

  const item = localStorage.getItem('user');
  let user;
  if (item) {
    user = JSON.parse(item);
  }

  const inputs = [
    new Input({
      value: user?.email || '',
      name: 'email',
      label: 'Почта',
      type: 'text',
      required: true,
      disabled: true,
      isProfileInput: true
    }),
    new Input({
      value: user?.login || '',
      name: 'login',
      label: 'Логин',
      type: 'text',
      required: true,
      disabled: true,
      isProfileInput: true
    }),
    new Input({
      value: user?.first_name || '',
      name: 'first_name',
      label: 'Имя',
      type: 'text',
      required: false,
      disabled: true,
      isProfileInput: true
    }),
    new Input({
      value: user?.second_name || '',
      name: 'second_name',
      label: 'Фамилия',
      type: 'text',
      required: false,
      disabled: true,
      isProfileInput: true
    }),
    new Input({
      value: user?.phone || '',
      name: 'phone',
      label: 'Телефон',
      type: 'text',
      required: false,
      disabled: true,
      isProfileInput: true
    }),
    new Input({
      value: user?.display_name || '',
      name: 'display_name',
      label: 'Имя в чате',
      type: 'text',
      disabled: true,
      isProfileInput: true
    })
  ];

  const signOutButton = new Button({
    title: 'Выйти'
  }, {
    click: async () => {
      await controller.logOut();
      router.go('/');
    }
  });

  const backButton = new Button({
    title: 'Назад к чатам'
  }, {
    click: async () => {
      router.go('/messenger');
    }
  });

  const context = {
    inputs: inputs.map((input) => input.transformToString()),
    changeData: 'Изменить данные',
    changePassword: 'Изменить пароль',
    signOut: signOutButton.transformToString(),
    back: backButton.transformToString()
  };

  return template(context);
};

export default class ViewProfilePage extends Block {
  constructor(context = {}, events = {}) {
    super('div', {
      context: {
        ...context,
        id: uuidv4()
      },
      template: getTemplate(),
      events
    });
  }
}
