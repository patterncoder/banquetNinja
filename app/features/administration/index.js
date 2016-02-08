import angular from 'angular';
import uirouter from 'angular-ui-router';
import states from './states';
import nav from './nav';
import data from './data';


import tmUsersCtrl from './users/usersCtrl';
import tmLookupsDetailCtrl from './lookups/tmLookupsDetailCtrl';


export default angular.module('users', [uirouter])
    
    .config(states)
    .config(nav)
    .config(data)
    .controller('tmUsersCtrl', tmUsersCtrl)
    .controller('tmLookupsDetailCtrl', tmLookupsDetailCtrl)
    .name