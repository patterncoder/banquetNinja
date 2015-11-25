import angular from 'angular';

import Home from './home';
import Users from './users'
import Production from './production';

export default angular.module('Features', [
    Home,
    Users,
    Production
]).name;