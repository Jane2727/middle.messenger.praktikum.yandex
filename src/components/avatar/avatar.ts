import { v4 as uuidv4 } from 'uuid';
import avatarTemplate from './avatar.tmpl';
import './avatar.scss';
import Block from '../../utils/block';
import { isClassDefined } from '../../utils';

export type TAvatar = {
    className: string;
    src?: string;
}

export default class Avatar extends Block {
  constructor(context: TAvatar, events = {}) {
    super('div', {
      context: {
        ...context,
        className: `${isClassDefined(context.className)}`,
        id: uuidv4(),
      },
      template: avatarTemplate,
      events,
    });
  }
}
