import buttonTemplate from './button.tmpl';
import { isClassDefined } from '../../utils';
import './button.scss';
import { Block } from '../../utils/block';

export type TButton = {
    title: string;
    buttonClassName?: string;
}

export class Button extends Block {
  constructor(context: TButton, events = {}) {
    super('div', {
      context: {
        ...context,
        buttonClassName: `button ${isClassDefined(context.buttonClassName)}`,
      },
      template: buttonTemplate,
      events,
    });
  }
}
