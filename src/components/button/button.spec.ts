import { expect } from 'chai';
import Button, { TButton } from './button';

describe('Проверяем компонент button', () => {
  beforeEach(() => {
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>');

    global.window = dom.window;
    global.document = dom.window.document;
  });

  const createButton = (context: TButton) => {
    const btn = new Button(context);
    return btn.transformToString();
  };

  it('Проверяем отрисовку компонента', () => {
    const context = { title: 'Отмена', buttonClassName: 'back-chat-button' };
    const btn = createButton(context);
    // eslint-disable-next-line no-unused-expressions
    expect(btn).to.not.be.null;
  });
});
