import './resizer.less';

export default function resizer() {
  return {
    restrict: 'A',
    template: require('./resizer.html'),
    scope: {
      active: '=',
      model: '=resizer',
      workspaceId: '='
    }
  };
}
