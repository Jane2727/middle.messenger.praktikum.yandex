import * as Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import loginTemplate from './login.tmpl';
import './login.scss';
import { checkValidation, checkAndCollectData } from '../../../../utils/checkValidation';
import Block from '../../../../utils/block';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import Form from '../../../../components/form/form';
import LoginController from '../../../../controllers/loginController';
import ChatController from '../../../../controllers/chatController';
import router from '../../../../router';

const controller = new LoginController();
const chatController = new ChatController();

const getTemplate = () => {
  const template = Handlebars.compile(loginTemplate);

  const loginInput = new Input({
    name: 'login',
    label: 'Логин',
    type: 'text',
    required: true,
    dataType: 'login',
    errorMessage: 'Неверный логин'
  },
  {
    focus: (event: Event) => {
      checkValidation({ event });
    },
    blur: (event: Event) => {
      checkValidation({ event });
    }
  });

  const passwordInput = new Input({
    name: 'password',
    label: 'Пароль',
    type: 'password',
    required: true,
    dataType: 'password',
    errorMessage: 'Неверный пароль'
  },
  {
    focus: (event: Event) => {
      checkValidation({ event });
    },
    blur: (event: Event) => {
      checkValidation({ event });
    }
  });

  const button = new Button({
    title: 'Авторизоваться'
  });

  const context = {
    inputs: [loginInput.transformToString(), passwordInput.transformToString()],
    button: button.transformToString(),
    linkTitle: 'Нет аккаунта?'
  };

  const form = new Form(
    {
      children: {
        inputs: [loginInput, passwordInput],
        button
      },
      content: template(context)
    }, {
      submit: async (event: CustomEvent) => {
        const isError = await checkAndCollectData(event, controller, 'login');
        if (!isError) {
          await chatController.getAllChats();
          router.go('/messenger');
        } else {
          console.warn(isError);
        }
      }
    }
  );

  return form.transformToString();
};

export default class LoginPage extends Block {
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
