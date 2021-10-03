import * as Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import notSelectedTemplate from './notSelectedChat.tmpl';
import './notSelectedChat.scss';
import Block from '../../../../utils/block';

const getTemplate = () => {
  const template = Handlebars.compile(notSelectedTemplate);

  const context = {
    emptyChatTitle: 'Выберите чат чтобы отправить сообщение',
  };

  return template(context);
};

export default class NotSelectedChatPage extends Block {
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
