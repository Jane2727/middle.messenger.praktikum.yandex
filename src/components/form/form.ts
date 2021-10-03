import { v4 as uuidv4 } from 'uuid';
import formTemplate from './form.tmpl';
import './form.scss';
import Block, { Dictionary } from '../../utils/block';

export type TForm = {
    children?: {
        inputs?: Dictionary[],
        button?: Dictionary,
    },
    content?: string,
}

export default class Form extends Block {
  constructor(context: TForm, events = {}) {
    super('div', {
      context: {
        ...context,
        id: uuidv4(),
      },
      template: formTemplate,
      events,
    });
  }
}
