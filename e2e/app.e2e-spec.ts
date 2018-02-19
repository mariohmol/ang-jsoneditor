import { AngularJsonEditorPage } from './app.po';

describe('angular-json-editor App', () => {
  let page: AngularJsonEditorPage;

  beforeEach(() => {
    page = new AngularJsonEditorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
