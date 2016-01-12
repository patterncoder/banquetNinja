import angular from 'angular';
import uirouter from 'angular-ui-router';
// config
import states from './states';
import nav from './nav';
import data from './data';
// tm services
import tmMenuItemDocSvc from './menuitems/tmMenuItemDocSvc';
// controllers
import tmMenuGroupsCtrl from './menugroups/tmMenuGroupsCtrl';
import tmMenuItemsCtrl from './menuitems/tmMenuItemsCtrl';
import tmMenusCtrl from './menus/tmMenusCtrl';
import tmModalMenuItemAdd from './menuitems/tmModalMenuItemAdd';
import tmDialogMenuItemAdd from './menuitems/tmDialogMenuItemAdd';
import tmMenuItemDetailCtrl from './menuitems/tmMenuItemDetailCtrl';

export default angular.module('production', [uirouter])
    
    .config(states)
    .config(nav)
    .config(data)
    .factory('tmMenuItemDocSvc', tmMenuItemDocSvc)
    .controller('tmMenuGroupsCtrl', tmMenuGroupsCtrl)
    .controller('tmMenuItemsCtrl', tmMenuItemsCtrl)
    .controller('tmMenusCtrl', tmMenusCtrl)
    .controller('tmModalMenuItemAdd', tmModalMenuItemAdd)
    .controller('tmDialogMenuItemAdd', tmDialogMenuItemAdd)
    .controller('tmMenuItemDetailCtrl', tmMenuItemDetailCtrl)
    .name