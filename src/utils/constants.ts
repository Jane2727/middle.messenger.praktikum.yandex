import { Dictionary } from './block';

export const routes: Dictionary = Object.freeze({
  login: 'login',
  registration: 'registration',
  notFound: 'notFound',
  internalServerError: 'internalServerError',
  forbidden: 'forbidden',
  serviceUnavailable: 'serviceUnavailable',
  chatSelected: 'chatSelected',
  notSelectedChat: 'notSelectedChat',
  viewProfile: 'viewProfile',
  editProfileData: 'editProfileData',
  editProfilePassword: 'editProfilePassword',
});

export const errorPageCodes: Dictionary = Object.freeze({
  notFound: '404',
  internalServerError: '500',
  forbidden: '403',
  serviceUnavailable: '503',
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
});

export const editProfilePage: Dictionary = Object.freeze({
  editProfileData: 'profileDataInputs',
  editProfilePassword: 'passwordInputs',
});
