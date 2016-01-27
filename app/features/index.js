import angular from 'angular';

import Home from './home';
import Users from './users'
import Production from './production';
import Customers from './customers';

export default angular.module('Features', [
    Home,
    Users,
    Production,
    Customers
]).name;