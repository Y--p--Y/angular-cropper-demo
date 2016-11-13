import angular from 'angular';

import 'angular-ui-router';
import routesConfig from './routes';
import HomeController from './app/home.controller';
import directives from './app/directives/directives';
import {home} from './app/home';

import './index.less';

export const app = 'app';

angular
  .module(app, ['ui.router', directives])
  .controller('HomeController', HomeController)
  .config(routesConfig)
  .component('app', home);
