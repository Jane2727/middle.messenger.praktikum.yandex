import HTTPTransport from '../utils/HTTPTransport';

const defaultUrl = '/chats';

const chatAPIInstance = new HTTPTransport(defaultUrl);

export interface IAddChatUser {
  users: string[];
  chatId: number;
}

export interface ICreateChat {
  title: string;
}

export default class ChatApi {
  get() {
    return chatAPIInstance.get('/');
  }

  createChat(data: ICreateChat) {
    return chatAPIInstance.post('/', data);
  }

  addUser(data: IAddChatUser) {
    return chatAPIInstance.put('/users', data);
  }

  getChatUsers(chatId: number = 0) {
    return chatAPIInstance.post(`/token/${chatId}`);
  }
}
