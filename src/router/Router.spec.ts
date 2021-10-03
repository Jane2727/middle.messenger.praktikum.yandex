import { expect } from 'chai';
import router from '.';

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

describe('Проверка переходов по роутам', () => {
  it('Проверка что все роуты добавлены', () => {
    expect(router.routes.length).to.eq(13);
  });

  it('Проверяем, что текущего роута нет до первого перехода', () => {
    expect(router.getCurrentRoute()).to.eq(undefined);
  });
});
