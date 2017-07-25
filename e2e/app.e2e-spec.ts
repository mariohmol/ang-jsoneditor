import { Angular4JsonEditorPage } from './app.po';

describe('angular4-json-editor App', () => {
  let page: Angular4JsonEditorPage;

  beforeEach(() => {
    page = new Angular4JsonEditorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
