import angular from 'angular';
import uirouter from 'angular-ui-router';
import states from './states';
import nav from './nav';
import data from './data';


import tmUsersCtrl from './users/usersCtrl';
import tmLookupsDetailCtrl from './lookups/tmLookupsDetailCtrl';
import tmUserDetailCtrl from './users/userDetailCtrl';


import tmUserDocSvc from './users/userDocSvc';

export default angular.module('users', [uirouter])
    
    .config(states)
    .config(nav)
    .config(data)
    .factory('tmUserDocSvc', tmUserDocSvc)
    .controller('tmUsersCtrl', tmUsersCtrl)
    .controller('tmLookupsDetailCtrl', tmLookupsDetailCtrl)
    .controller('tmUserDetailCtrl', tmUserDetailCtrl)
    .name