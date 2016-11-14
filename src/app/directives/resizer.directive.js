import './resizer.less';

export default function resizer() {
  return {
    restrict: 'A',
    template: require('./resizer.html'),
    scope: {
      model: '=resizer',
      workspaceId: '='
    },
    link: scope => {
      scope.$watch('model', model => {
        if (!model) {
          return;
        }

        scope.style = {
          left: `${model.x}px`,
          top: `${model.y}px`,
          height: `${model.height}px`,
          width: `${model.width}px`
        };
      });
    }
  };
}
