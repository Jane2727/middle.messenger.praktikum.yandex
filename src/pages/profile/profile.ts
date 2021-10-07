import { v4 as uuidv4 } from 'uuid';
import * as Handlebars from 'handlebars';
import profileTemplate from './profile.tmpl';
import './profile.scss';
import { avatarIconBase64 } from '../../utils/constants';
import Block from '../../utils/block';
import ViewProfilePage from './modules/viewProfile/viewProfile';
import EditProfilePage from './modules/editProfile/editProfile';
import Avatar from '../../components/avatar/avatar';
import UserController from '../../controllers/userController';

export type TProfilePage = {
  isViewProfile?: boolean;
  profileType?: string;
  content?: string;
}

const controller = new UserController();

const getName = () => {
  const item = localStorage.getItem('user');
  let user;
  if (item) {
    user = JSON.parse(item);
  }

  return user?.display_name || user?.first_name || '';
};

const getAvatar = () => {
  const avatar = localStorage.getItem('avatarIcon');

  return avatar || avatarIconBase64;
};

const getTemplate = (profileType?: string, isViewProfile?: boolean) => {
  const template = Handlebars.compile(profileTemplate);

  const avatar = new Avatar({
    className: 'profile-page__image__icon',
    src: getAvatar()
  }, {
    change: async (e: CustomEvent) => {
      const input = e.target as HTMLInputElement;

      if (input) {
        const image = document.getElementById('avatar') as HTMLImageElement;
        const file = input.files[0];
        if (file && image) {
          await controller.changeUserAvatar(file, image);
        }
      }
    }
  });

  const content = isViewProfile
    ? new ViewProfilePage().transformToString()
    : new EditProfilePage({ profileType: profileType || 'profileDataInputs' }).transformToString();

  const context = {
    avatar: avatar.transformToString(),
    header: getName(),
    isViewMode: isViewProfile,
    content
  };

  return template(context);
};

export default class ProfilePage extends Block {
  constructor(context: TProfilePage, events = {}) {
    super('div', {
      context: {
        ...context,
        id: uuidv4()
      },
      template: getTemplate(context.profileType, context.isViewProfile),
      events
    });
  }
}
