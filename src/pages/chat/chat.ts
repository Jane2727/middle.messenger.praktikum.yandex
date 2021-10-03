import { v4 as uuidv4 } from 'uuid';
import * as Handlebars from 'handlebars';
import chatPageTemplate from './chat.tmpl';
import newChatTemplate from './newChat.tmpl';
import chatElemTemplate from './chatElem.tmpl';
import avatarIcon from '../../../static/assets/avatar-icon';
import './chat.scss';
import Block from '../../utils/block';
import Input from '../../components/input/input';
import ChatSelectedPage from './modules/chatSelected/chatSelected';
import NotSelectedChatPage from './modules/notSelectedChat/notSelectedChat';
import Button from '../../components/button/button';
import Form from '../../components/form/form';
import ChatController from '../../controllers/chatController';
import router from '../../router';

export interface IChatData {
  avatar: string
  created_by: number
  id: number
  last_message: string
  title: string
  unread_count: number
}

const chatController = new ChatController();

export const showModal = async (formId: string) => {
  const form = document.getElementById(formId);
  if (form?.classList.contains('hidden')) {
    form?.classList.remove('hidden');
  }
};

export const closeModal = (formId: string, inputClassName: string) => {
  const input = document.querySelector(inputClassName) as HTMLInputElement;
  const form = document.getElementById(formId);
  if (input) input.value = '';
  form?.classList.add('hidden');
};

const createNewChat = async () => {
  const input = document.querySelector('.new-chat-input') as HTMLInputElement;
  const title = input.value;
  await chatController.createChat({ title });
  closeModal('chat-form', '.new-chat-input');
};

const getTemplate = (isChatSelected?: boolean) => {
  const template = Handlebars.compile(chatPageTemplate);
  const chatTemplate = Handlebars.compile(newChatTemplate);
  const elemTemplate = Handlebars.compile(chatElemTemplate);

  const currentChatArea = isChatSelected
    ? new ChatSelectedPage().transformToString()
    : new NotSelectedChatPage().transformToString();

  const searchInput = new Input({
    label: 'Поиск',
    inputClassName: 'input__search',
    name: 'search',
    type: 'text',
    inputContainerClassName: 'input__container-gray',
  });

  const chatTitleInput = new Input({
    name: 'title',
    label: 'Название нового чата',
    type: 'text',
    required: true,
    dataType: 'text',
    inputClassName: 'new-chat-input',
    inputContainerClassName: 'input__container-gray',
  });

  const createChat = new Button({
    title: 'Создать чат',
    buttonClassName: 'create-chat-button',
  });

  const backButton = new Button({
    title: 'Отмена',
    buttonClassName: 'back-chat-button',
  }, {
    click: () => {
      closeModal('chat-form', '.new-chat-input');
    },
  });

  const newChatContext = {
    input: chatTitleInput.transformToString(),
    createChat: createChat.transformToString(),
    backButton: backButton.transformToString(),
  };

  const chatForm = new Form(
    {
      children: {
        inputs: [chatTitleInput],
        button: createChat,
      },
      content: chatTemplate(newChatContext),
    }, {
      submit: async () => {
        await createNewChat();
      },
    },
  );

  const newChat = new Button({
    title: 'Новый чат',
    buttonClassName: 'new-chat-button',
  }, {
    click: async () => {
      await showModal('chat-form');
    },
  });

  const item = localStorage.getItem('chats');
  let chatsData;
  if (item) {
    chatsData = JSON.parse(item);
    chatsData = chatsData.map((el: IChatData) => {
      const elemContext = { ...el, avatar: el.avatar || avatarIcon };

      const elem = new Button({
        isLink: true,
        buttonClassName: 'new-chat-link',
        content: elemTemplate(elemContext),
      }, {
        click: () => {
          const { id } = elemContext;
          localStorage.setItem('currentChat', id.toString());
          router.go('/messenger-active');
        },
      });

      return elem.transformToString();
    });
  }

  const context = {
    currentChatArea,
    profileTitle: 'Профиль',
    emptyChatTitle: 'Выберите чат чтобы отправить сообщение',
    searchInput: searchInput.transformToString(),
    createChat: newChat.transformToString(),
    chatForm: chatForm.transformToString(),
    newChatTitle: 'Создание нового чата',
    contacts: chatsData || [],
  };

  return template(context);
};

export type TChatPage = {
  isChatSelected?: boolean,
  content?: string,
}

export default class ChatPage extends Block {
  constructor(context: TChatPage, events = {}) {
    super('div', {
      context: {
        ...context,
        id: uuidv4(),
      },
      template: getTemplate(context.isChatSelected),
      events,
    });
  }
}
