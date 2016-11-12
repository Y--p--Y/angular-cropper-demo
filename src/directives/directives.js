import angular from 'angular';
import resizer from './resizer.directive';
import workspace from './workspace.directive';

export default angular.module('app.directives', [])
  .directive('resizer', resizer)
  .directive('workspace', workspace)
  .name;
