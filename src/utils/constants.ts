import { Dictionary } from './block';

export const routes: Dictionary = Object.freeze({
  login: 'sign-in',
  registration: 'sign-up',
  notFound: '404',
  internalServerError: '500',
  forbidden: '403',
  serviceUnavailable: '503',
  unauthorized: '401',
  chatSelected: 'messenger-active',
  notSelectedChat: 'messenger',
  viewProfile: 'settings',
  editProfileData: 'settings-edit-data',
  editProfilePassword: 'settings-edit-password',
});

export const errorPageSchema: Dictionary = Object.freeze({
  404: {
    title: 'Не туда попали',
    linkTitle: 'Назад к чатам',
  },
  500: {
    title: 'Мы уже фиксим',
    linkTitle: 'Назад к чатам',
  },
  403: {
    title: 'Нет доступа',
    linkTitle: 'Какой-то ещё текст',
  },
  503: {
    title: 'Сервис недоступен',
    linkTitle: 'Какой-то ещё текст',
  },
  401: {
    title: 'Пользователь не авторизован',
    linkTitle: 'Назад к странице входа',
  },
});

export const editProfilePage: Dictionary = Object.freeze({
  editProfileData: 'profileDataInputs',
  editProfilePassword: 'passwordInputs',
});
