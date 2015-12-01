import angular from 'angular';
import uirouter from 'angular-ui-router';
// config
import states from './states';
import nav from './nav';
import data from './data';
// controllers
import tmMenuGroupsCtrl from './menugroups/tmMenuGroupsCtrl';
import tmMenuItemsCtrl from './menuitems/tmMenuItemsCtrl';
import tmMenusCtrl from './menus/tmMenusCtrl';
import tmModalMenuItemAdd from './menuitems/tmModalMenuItemAdd';


export default angular.module('production', [uirouter])
    
    .config(states)
    .config(nav)
    .config(data)
    .controller('tmMenuGroupsCtrl', tmMenuGroupsCtrl)
    .controller('tmMenuItemsCtrl', tmMenuItemsCtrl)
    .controller('tmMenusCtrl', tmMenusCtrl)
    .controller('tmModalMenuItemAdd', tmModalMenuItemAdd)
    .name