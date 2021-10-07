import * as Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import selectedTemplate from './chatSelected.tmpl';
import newUserTemplate from './newUser.tmpl';
import { avatarIconBase64 } from '../../../../utils/constants';
import './chatSelected.scss';
import { checkValidation } from '../../../../utils';
import Block, { Dictionary } from '../../../../utils/block';
import Input from '../../../../components/input/input';
import { closeModal, showModal } from '../../chat';
import Button from '../../../../components/button/button';
import Form from '../../../../components/form/form';
import ChatController, { IChatData } from '../../../../controllers/chatController';
import { createChatWebSocket } from '../../../../utils/chatWebSocket';
import router from '../../../../router';
import store from '../../../../store';

const chatController = new ChatController();

const getDataFromChat = (currentChatId: string, localStorageKey: string, valueKey: string) => {
  let value: string | string[] = valueKey === 'users' ? [] : '';
  const item = localStorage.getItem(localStorageKey);
  let chats;
  if (item) {
    chats = JSON.parse(item);
  }

  if (currentChatId && chats) {
    const chat = chats.filter((el: IChatData) => (el.id).toString() === currentChatId);
    if (chat.length > 0) {
      value = chat[0][valueKey];
    }
  }

  return value;
};

const addUsersToChat = async (chatId: string) => {
  const input = document.querySelector('.new-user-input') as HTMLInputElement;
  const users = input.value.split(',');

  await chatController.addUser({ users, chatId: parseInt(chatId, 10) });
  store.setStateAndPersist({ usersInChats: [{ id: chatId, users }] });

  closeModal('user-form', '.new-user-input');
  router.go('/messenger-active');
};

const sendMessage = (socket: WebSocket) => {
  const messageInput = document.querySelector('.input__message') as HTMLInputElement;
  const message = {
    content: messageInput.value,
    type: 'message'
  };
  socket.send(JSON.stringify(message));
  messageInput.value = '';
};

const getOldMessages = (socket: WebSocket) => {
  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({
      content: '0',
      type: 'get old'
    }));
  });
};

const handleMessages = (message: Dictionary | Dictionary []) => {
  const isMessagesArray = message instanceof Array;

  const addMessage = (elem: Dictionary) => {
    if (elem?.content) {
      const container = document.querySelector('.messages__container');
      const node = document.createElement('div');
      node.className = 'message';
      node.textContent = elem.content;
      container.appendChild(node);
    }
  };

  if (isMessagesArray) {
    message.map((el: Dictionary) => addMessage(el));
  } else {
    addMessage(message);
  }
};

const getTemplate = () => {
  const template = Handlebars.compile(selectedTemplate);
  const userTempl = Handlebars.compile(newUserTemplate);

  const wsParamsString = localStorage.getItem('wsParams');
  let wsParams;
  if (wsParamsString) {
    wsParams = JSON.parse(wsParamsString);
  }

  const socket = createChatWebSocket(wsParams, handleMessages);

  getOldMessages(socket);

  const currentChatId = localStorage.getItem('currentChat');

  const message = new Input({
    label: 'Сообщение',
    inputClassName: 'input__message',
    name: 'message',
    type: 'text',
    dataType: 'message',
    inputContainerClassName: 'input__container-gray'
  },
  {
    focus: (event: Event) => {
      checkValidation({ event });
    },
    blur: (event: Event) => {
      checkValidation({ event });
    }
  });

  const createUser = new Button({
    title: 'Добавить',
    buttonClassName: 'create-user-button'
  });

  const backButton = new Button({
    title: 'Отмена',
    buttonClassName: 'back-chat-button'
  }, {
    click: () => {
      closeModal('user-form', '.new-user-input');
    }
  });

  const chatUserInput = new Input({
    name: 'title',
    label: 'Введите имя пользователя',
    type: 'text',
    required: true,
    dataType: 'text',
    inputClassName: 'new-user-input',
    inputContainerClassName: 'input__container-gray'
  });
  const newChatContext = {
    input: chatUserInput.transformToString(),
    createUser: createUser.transformToString(),
    backButton: backButton.transformToString()
  };

  const userForm = new Form(
    {
      children: {
        inputs: [chatUserInput],
        button: createUser
      },
      content: userTempl(newChatContext)
    }, {
      submit: async () => {
        await addUsersToChat(currentChatId || '');
      }
    }
  );

  const newUser = new Button({
    title: 'Добавить пользователя',
    buttonClassName: 'add-user-button'
  }, {
    click: async () => {
      await showModal('user-form');
    }
  });

  const sendButton = new Button({
    isLink: true,
    buttonClassName: 'send-button__icon'
  }, {
    click: () => {
      sendMessage(socket);
    }
  });

  const context = {
    avatarIcon: avatarIconBase64,
    sendButton: sendButton.transformToString(),
    chatTitle: getDataFromChat(currentChatId || '', 'chats', 'title'),
    message: message.transformToString(),
    createUser: newUser.transformToString(),
    userForm: userForm.transformToString(),
    newUserTitle: 'Добавить пользователя в чат',
    users: getDataFromChat(currentChatId || '', 'usersInChats', 'users')
  };

  return template(context);
};

export default class ChatSelectedPage extends Block {
  constructor(context = {}, events = {}) {
    super('div', {
      context: {
        ...context,
        id: uuidv4()
      },
      template: getTemplate(),
      events
    },
    'current-chat-container');
  }
}
