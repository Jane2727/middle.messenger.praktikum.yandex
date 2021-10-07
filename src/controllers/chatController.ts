import ChatApi, { IAddChatUser, ICreateChat } from '../api/chatApi';
import store from '../store';
import { Dictionary } from '../utils/block';

const chatAPIInstance = new ChatApi();

export interface IChatData {
  avatar: string;
  created_by: number;
  id: number;
  last_message: Dictionary;
  title: string;
  unread_count: number;
}

class ChatController {
  public async getChats() {
    try {
      await chatAPIInstance.get();
    } catch (e) {
      return e.reason;
    }
  }

  public async createChat(data: ICreateChat) {
    try {
      const chatData = await chatAPIInstance.createChat(data);
      if (chatData) {
        store.setStateAndPersist({ currentChat: (chatData as IChatData).id });
      }
      await this.getAllChats();
    } catch (e) {
      return e.reason;
    }
  }

  public async getAllChats() {
    let res;
    try {
      res = await chatAPIInstance.get();
    } catch (e) {
      res = e.reason;
    }
    if (res !== 'Not found') {
      store.setStateAndPersist({ chats: res });
    }
    return res;
  }

  public async addUser(data: IAddChatUser) {
    try {
      await chatAPIInstance.addUser(data);
    } catch (e) {
      return e.reason;
    }
  }

  public async getChatToken(id?: number) {
    let res;
    try {
      res = await chatAPIInstance.getChatUsers(id);
    } catch (e) {
      res = e.reason;
    }
    if (res !== 'Not found') {
      store.setStateAndPersist({ savedToken: res });
    }
    return res;
  }

  public async getChatUsers(id: number) {
    try {
      return await this.getChatToken(id);
    } catch (e) {
      return e.reason;
    }
  }

  public async connectToChat(userId: number, chatId: number) {
    try {
      const tokenData = await this.getChatUsers(chatId);
      const { token } = tokenData || {};
      const params = { userId, chatId, token };

      store.setStateAndPersist({ wsParams: params });
    } catch (e) {
      console.log(e);
    }
  }
}

export default ChatController;
