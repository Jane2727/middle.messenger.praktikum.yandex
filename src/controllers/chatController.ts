import ChatApi, { IAddChatUser, ICreateChat } from '../api/chatApi';

const chatAPIInstance = new ChatApi();

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
      await chatAPIInstance.createChat(data);
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
      localStorage.setItem('chats', JSON.stringify(res));
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

  public async getChatUsers(id: number) {
    try {
      const users: unknown = await chatAPIInstance.getChatUsers(id);
      const { token } = JSON.parse(users as string);

      return token;
    } catch (e) {
      return e.reason;
    }
  }
}

export default ChatController;
