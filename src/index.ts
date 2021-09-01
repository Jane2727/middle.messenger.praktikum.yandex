import { homePage } from './pages/home';
import { errorPage } from './pages/errors';
import { chatPage } from './pages/chat';
import { profilePage } from './pages/profile';
import { routes } from './utils';
import './common.scss';
import './utils/helpers';

const root: HTMLElement | null = document.getElementById('root');

const content = {
  login: homePage(routes.login),
  registration: homePage(routes.registration),
  notSelectedChat: chatPage(routes.notSelectedChat),
  chatSelected: chatPage(routes.chatSelected),
  viewProfile: profilePage(routes.viewProfile),
  editProfileData: profilePage(routes.editProfileData),
  editProfilePassword: profilePage(routes.editProfilePassword),
  internalServerError: errorPage(routes.internalServerError),
  notFound: errorPage(routes.notFound),
};

if (root) {
  switch (window.location.pathname) {
    case '/':
    case `/${routes.login}`:
      root.innerHTML = content.login;
      break;
    case `/${routes.registration}`:
      root.innerHTML = content.registration;
      break;
    case `/${routes.notSelectedChat}`:
      root.innerHTML = content.notSelectedChat;
      break;
    case `/${routes.chatSelected}`:
      root.innerHTML = content.chatSelected;
      break;
    case `/${routes.viewProfile}`:
      root.innerHTML = content.viewProfile;
      break;
    case `/${routes.editProfileData}`:
      root.innerHTML = content.editProfileData;
      break;
    case `/${routes.editProfilePassword}`:
      root.innerHTML = content.editProfilePassword;
      break;
    case `/${routes.internalServerError}`:
      root.innerHTML = content.internalServerError;
      break;
    case `/${routes.notFound}`:
    default:
      root.innerHTML = content.notFound;
      break;
  }
}
