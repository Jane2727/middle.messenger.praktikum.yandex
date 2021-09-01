import * as Handlebars from 'handlebars';
import buttonTemplate from './button.tmpl';
import { isClassDefined } from '../../utils';
import './button.scss';

const template = Handlebars.compile(buttonTemplate);

export interface IButton {
    title: string;
    buttonClassName?: string;
}

export function Button({ title, buttonClassName }: IButton) {
  const context = {
    title,
    buttonClassName: `button ${isClassDefined(buttonClassName)}`,
  };

  return template(context);
}
