import { expect } from 'chai';

import { hello } from '../src/hello';

describe('Typescript + Babel usage suite', () => {
  it('should return string correctly', () => {
    expect(hello('mocha'), 'Hello mocha');
  });
});

describe('Авторизация', () => {
  it('Проверяем корректный logout', () => {
  });

  describe('Проверка авторизации через форму', () => {
    it('Проверяем валидные данные в signin', () => {
    });

    it('Проверяем валидные данные в signup', () => {
    });
  });

  describe('Дополнительный функционал при авторизации', () => {
    it('Что-то дополнительно связанное с авторизацией', () => {
    });
  });
});
