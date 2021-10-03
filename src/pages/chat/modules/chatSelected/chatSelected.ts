import * as Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import selectedTemplate from './chatSelected.tmpl';
import newUserTemplate from './newUser.tmpl';
import sendIcon from '../../../../../static/assets/arrow-send';
import chatSettingsIcon from '../../../../../static/assets/chat-settings';
import addFileIcon from '../../../../../static/assets/add-file';
import avatarIcon from '../../../../../static/assets/avatar-icon';
import './chatSelected.scss';
import { checkValidation } from '../../../../utils';
import Block from '../../../../utils/block';
import Input from '../../../../components/input/input';
import { closeModal, IChatData, showModal } from '../../chat';
import Button from '../../../../components/button/button';
// import ChatController from '../../../../controllers/chatController';
import Form from '../../../../components/form/form';

// const chatController = new ChatController();

const getDataFromChat = (currentChatId: string, localStorageKey: string, valueKey: string) => {
  let value = '';
  const item = localStorage.getItem(localStorageKey);
  let chats;
  if (item) {
    chats = JSON.parse(item);
  }

  if (currentChatId && chats) {
    const chat = chats.filter((el: IChatData) => (el.id).toString() === currentChatId);
    value = chat[0][valueKey];
  }

  return value;
};

const createNewUser = async (chatId: string) => {
  const input = document.querySelector('.new-user-input') as HTMLInputElement;
  const userName = input.value;
  const users = [userName.toString()];
  // скорее всего тут должна быть какая-то трансформация имени в id, который нужно передать на сервер
  // await chatController.addUser({ users, chatId: parseInt(chatId, 10) });
  localStorage.setItem('usersInChats', JSON.stringify([{ id: chatId, users }]));
  closeModal('user-form', '.new-user-input');
};

const getTemplate = () => {
  const template = Handlebars.compile(selectedTemplate);
  const userTempl = Handlebars.compile(newUserTemplate);

  const currentChatId = localStorage.getItem('currentChat');

  const message = new Input({
    label: 'Сообщение',
    inputClassName: 'input__message',
    name: 'message',
    type: 'text',
    dataType: 'message',
    inputContainerClassName: 'input__container-gray',
  },
  {
    focus: (event: Event) => {
      checkValidation({ event });
    },
    blur: (event: Event) => {
      checkValidation({ event });
    },
  });

  const createUser = new Button({
    title: 'Добавить',
    buttonClassName: 'create-user-button',
  });

  const backButton = new Button({
    title: 'Отмена',
    buttonClassName: 'back-chat-button',
  }, {
    click: () => {
      closeModal('user-form', '.new-user-input');
    },
  });

  const chatUserInput = new Input({
    name: 'title',
    label: 'Введите имя пользователя',
    type: 'text',
    required: true,
    dataType: 'text',
    inputClassName: 'new-user-input',
    inputContainerClassName: 'input__container-gray',
  });
  const newChatContext = {
    input: chatUserInput.transformToString(),
    createUser: createUser.transformToString(),
    backButton: backButton.transformToString(),
  };

  const userForm = new Form(
    {
      children: {
        inputs: [chatUserInput],
        button: createUser,
      },
      content: userTempl(newChatContext),
    }, {
      submit: async () => {
        await createNewUser(currentChatId || '');
      },
    },
  );

  const newUser = new Button({
    title: 'Добавить пользователя',
    buttonClassName: 'add-user-button',
  }, {
    click: async () => {
      await showModal('user-form');
    },
  });

  const context = {
    avatarIcon,
    sendIcon,
    chatSettingsIcon,
    addFileIcon,
    chatTitle: getDataFromChat(currentChatId || '', 'chats', 'title'),
    message: message.transformToString(),
    createUser: newUser.transformToString(),
    userForm: userForm.transformToString(),
    newUserTitle: 'Добавить пользователя в чат',
    users: getDataFromChat(currentChatId || '', 'usersInChats', 'users'),
  };

  return template(context);
};

export default class ChatSelectedPage extends Block {
  constructor(context = {}, events = {}) {
    super('div', {
      context: {
        ...context,
        id: uuidv4(),
      },
      template: getTemplate(),
      events,
    },
    'current-chat-container');
  }
}
