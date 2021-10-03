import Dictionary from './block';

type TWebSocketParams = {
    userId: number,
    chatId: number,
    tokenValue: string,
};

const DEFAULT_URL = 'wss://ya-praktikum.tech/ws/';

export function createChatWebSocket(params: TWebSocketParams, onMessageFunc?: (data: Dictionary) => void) {
  const { userId, chatId, tokenValue } = params;

  const socket = new WebSocket(`${DEFAULT_URL}chats/${userId}/${chatId}/${tokenValue}`);

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
  });

  socket.addEventListener('close', (event) => {
    const { wasClean, code, reason } = event;

    console.log(wasClean ? 'Соединение закрыто чисто' : 'Обрыв соединения');

    console.log(`Код: ${code} | Причина: ${reason}`);
  });

  socket.addEventListener('message', (event) => {
    const { data } = event;

    if (onMessageFunc) onMessageFunc(JSON.parse(data));
  });

  socket.addEventListener('error', (event: any) => {
    console.log('Ошибка', event.message);
  });

  return socket;
}
