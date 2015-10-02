import angular from 'angular';
import uirouter from 'angular-ui-router';

import states from './states';

export default angular.module('shell', [uirouter])
    .config(states)
    .name;