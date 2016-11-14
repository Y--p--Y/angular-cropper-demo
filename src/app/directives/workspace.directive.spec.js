import Resizers from './resizers.model';

/* global angular:true */
describe('Workspace directive', () => {
  beforeEach(angular.mock.module('app.directives'));

  let elem;
  let isolateScope;

  beforeEach(angular.mock.inject(($rootScope, $compile) => {
    const scope = $rootScope.$new();
    scope.imageSrc = require('../../../img/example.jpg');
    elem = angular.element('<workspace image-src="imageSrc"></workspace>');
    elem = $compile(elem)(scope);
    scope.$digest();
    isolateScope = elem.isolateScope();
  }));

  it('should have an image with class name "workspace-image"', () => {
    const img = elem.find('img');
    expect(img.hasClass('workspace-image')).toBe(true);
  });

  it('should have no resizers', () => {
    expect(isolateScope.resizers.list.length).toBe(0);
  });

  it('should have working set to falsy', () => {
    expect(isolateScope.working).toBeFalsy();
  });

  it('should have done set to falsy', () => {
    expect(isolateScope.done).toBeFalsy();
  });

  it('should have a hidden canvas', () => {
    const canvas = elem.find('canvas');
    expect(canvas.length).toBe(1);
    expect(canvas.hasClass('ng-hide')).toBe(true);
  });

  it('should not have workspace-gallery', () => {
    const imgs = elem.find('img');
    expect(imgs.hasClass('workspace-gallery')).toBe(false);
  });

  describe('after clicking Go Cropping button', () => {
    beforeEach(() => {
      isolateScope.resizers = new Resizers({
        width: 100,
        height: 100
      });
      isolateScope.canvasReady = true;
      isolateScope.startWork();
      isolateScope.$digest();
    });

    it('should display canvas', () => {
      const canvas = elem.find('canvas');
      expect(canvas.hasClass('ng-hide')).toBe(false);
    });

    it('should set working to true', () => {
      expect(isolateScope.working).toBe(true);
    });
  });

  describe('after clicking Done button', () => {
    const list = [{inactive: true}, {}, {}];

    beforeEach(() => {
      // set resizers
      isolateScope.resizers = new Resizers({
        width: 100,
        height: 100
      });
      isolateScope.resizers.list = list;
      isolateScope.finishWork();
      isolateScope.$digest();
    });

    it('all resizers should be inactive', () => {
      expect(isolateScope.inactives.length).toBe(list.length);
      expect(isolateScope.resizers.list.filter(
        resizer => !resizer.inactive
      ).length).toBe(0);
    });

    it('should set working to false', () => {
      expect(isolateScope.working).toBe(false);
    });

    it('should set done to true', () => {
      expect(isolateScope.done).toBe(true);
    });
  });
});
