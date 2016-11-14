/* global angular:true */
describe('Resizer', () => {
  beforeEach(angular.mock.module('app.directives'));

  let elem;
  let scope;
  let innerScope;
  const resizer = {
    x: 1,
    y: 2,
    width: 3,
    height: 4
  };

  beforeEach(angular.mock.inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    scope.resizer = resizer;

    elem = $compile('<div resizer="resizer" workspace-id="0"></div>')(scope);
    scope.$digest();
    innerScope = elem.isolateScope();
  }));

  it('should render the resizer', () => {
    const style = innerScope.style;
    expect(style.left).toBe(`${resizer.x}px`);
    expect(style.top).toBe(`${resizer.y}px`);
    expect(style.width).toBe(`${resizer.width}px`);
    expect(style.height).toBe(`${resizer.height}px`);

    expect(elem.attr('workspace-id')).toBe('0');
  });
});
