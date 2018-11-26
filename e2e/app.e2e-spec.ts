import { NgPackagedPage } from './app.po';

describe('ng-packaged App', () => {
  let page: NgPackagedPage;

  beforeEach(() => {
    page = new NgPackagedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    page.getParagraphText()
    .then(t => {
      expect(t).toEqual('Welcome to Angular Json Editor');
    });
  });
});
