import { HgPage } from './app.po';

describe('hg App', () => {
  let page: HgPage;

  beforeEach(() => {
    page = new HgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
