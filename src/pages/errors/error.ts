import * as Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import errorPageTemplate from './error.tmpl';
import './error.scss';
import Block from '../../utils/block';

export type TScheme = {
  code: string,
  title: string,
  linkTitle: string
}

const getTemplate = (scheme?: TScheme) => {
  const template = Handlebars.compile(errorPageTemplate);

  const context = {
    code: scheme?.code,
    title: scheme?.title,
    linkTitle: scheme?.linkTitle,
  };

  return template(context);
};

export type TErrorPage = {
  scheme?: TScheme,
}

export default class ErrorPage extends Block {
  constructor(context: TErrorPage, events = {}) {
    super('div', {
      context: {
        ...context,
        id: uuidv4(),
      },
      template: getTemplate(context.scheme),
      events,
    });
  }
}
