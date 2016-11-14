import HomeController from './home.controller.js';

describe('Home Controller', () => {
  let ctrl;
  beforeEach(() => {
    ctrl = new HomeController();
  });

  it('should have image source', () => {
    expect(ctrl.imageSrc).toBeTruthy();
  });
});
