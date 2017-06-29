import { TwubricPage } from './app.po';

describe('twubric App', () => {
  let page: TwubricPage;

  beforeEach(() => {
    page = new TwubricPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
