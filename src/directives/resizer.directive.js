import angular from 'angular';

import './resizer.less';

export default function resizer () {
  return {
    restrict: 'A',
    templateUrl: './directives/resizer.html',
    scope: {
      active: '=',
      model: '=resizer'
    },
    link: (scope) => {
      scope.$watch('model', (model) => {
        if (model) {
          scope.style = {
            left: model.x + 'px',
            top: model.y + 'px',
            width: model.width + 'px',
            height: model.height + 'px'
          };
        }
      });
    }
  };
};
