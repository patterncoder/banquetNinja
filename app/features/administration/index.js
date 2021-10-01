import angular from 'angular';
import uirouter from 'angular-ui-router';
import states from './states';
import nav from './nav';
import data from './data';


import tmUsersCtrl from './users/usersCtrl';
import tmLookupsDetailCtrl from './lookups/tmLookupsDetailCtrl';
import tmUserDetailCtrl from './users/userDetailCtrl';
import tmSettingsDetailCtrl from './settings/settingsDetailCtrl';
import tmSettingsCtrl from './settings/settingsCtrl';
import tmSettingsDocSvc from './settings/tmSettingsDocSvc';


import tmUserDocSvc from './users/tmUserDocSvc';

export default angular.module('users', [uirouter])
    
    .config(states)
    .config(nav)
    .config(data)
    .factory('tmUserDocSvc', tmUserDocSvc)
    .factory('tmSettingsDocSvc', tmSettingsDocSvc)
    .controller('tmUsersCtrl', tmUsersCtrl)
    .controller('tmLookupsDetailCtrl', tmLookupsDetailCtrl)
    .controller('tmUserDetailCtrl', tmUserDetailCtrl)
    .controller('tmSettingsDetailCtrl', tmSettingsDetailCtrl)
    .controller('tmSettingsCtrl', tmSettingsCtrl)
    .name