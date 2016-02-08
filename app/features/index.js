import angular from 'angular';

import Home from './home';
import Administration from './administration'
import Production from './production';
import Customers from './customers';
import Events from './events';

export default angular.module('Features', [
    Home,
    Administration,
    Production,
    Customers,
    Events
]).name;