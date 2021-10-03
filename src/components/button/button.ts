import { v4 as uuidv4 } from 'uuid';
import buttonTemplate from './button.tmpl';
import linkTemplate from './link.tmpl';
import { isClassDefined } from '../../utils';
import './button.scss';
import Block from '../../utils/block';

export type TButton = {
    title?: string;
    isLink?: boolean;
    buttonClassName?: string;
    content?: string;
}

const getClassName = (context: TButton) => {
  const className = context.isLink ? 'button-link' : 'button';
  return `${className} ${isClassDefined(context.buttonClassName)}`;
};

export default class Button extends Block {
  constructor(context: TButton, events = {}) {
    super('div', {
      context: {
        ...context,
        buttonClassName: getClassName(context),
        id: uuidv4(),
      },
      template: context.isLink ? linkTemplate : buttonTemplate,
      events,
    });
  }
}
