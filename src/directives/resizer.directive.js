import angular from 'angular';

import './resizer.less';

export default function resizer () {
  return {
    restrict: 'A',
    templateUrl: './directives/resizer.html',
    scope: {
      active: '=',
      model: '=resizer',
      workspaceId: '='
    }
  };
};
