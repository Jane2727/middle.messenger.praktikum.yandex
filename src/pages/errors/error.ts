import * as Handlebars from 'handlebars';
import errorPageTemplate from './error.tmpl';
import './error.scss';

export function errorPage(scheme: {code: string, title: string, linkTitle: string}) {
  const template = Handlebars.compile(errorPageTemplate);

  const context = {
    code: scheme.code,
    title: scheme.title,
    linkTitle: scheme.linkTitle,
  };

  return template(context);
}
