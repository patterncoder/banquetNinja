import angular from 'angular';
import uirouter from 'angular-ui-router';
// config
import states from './states';
import nav from './nav';
import data from './data';
// tm services
import tmMenuItemDocSvc from './menuitems/tmMenuItemDocSvc';
import tmMenuDocSvc from './menus/tmMenuDocSvc';
import tmMenuGroupDocSvc from './menugroups/tmMenuGroupDocSvc';
// controllers
import tmMenuGroupsCtrl from './menugroups/tmMenuGroupsCtrl';
import tmMenuGroupDetailCtrl from './menugroups/tmMenuGroupDetailCtrl';

import tmMenusCtrl from './menus/tmMenusCtrl';
import tmMenuDetailCtrl from './menus/tmMenuDetailCtrl';

//import tmModalMenuItemAdd from './menuitems/tmModalMenuItemAdd';
import tmDialogMenuItemAdd from './menuitems/tmDialogMenuItemAdd';
import tmMenuItemDetailCtrl from './menuitems/tmMenuItemDetailCtrl';
import tmMenuItemsCtrl from './menuitems/tmMenuItemsCtrl';

export default angular.module('production', [uirouter])
    
    .config(states)
    .config(nav)
    .config(data)
    .factory('tmMenuItemDocSvc', tmMenuItemDocSvc)
    .factory('tmMenuDocSvc', tmMenuDocSvc)
    .factory('tmMenuGroupDocSvc', tmMenuGroupDocSvc)
    .controller('tmMenuGroupDetailCtrl', tmMenuGroupDetailCtrl)
    .controller('tmMenuDetailCtrl', tmMenuDetailCtrl)
    .controller('tmMenuGroupsCtrl', tmMenuGroupsCtrl)
    .controller('tmMenuItemsCtrl', tmMenuItemsCtrl)
    .controller('tmMenusCtrl', tmMenusCtrl)
    //.controller('tmModalMenuItemAdd', tmModalMenuItemAdd)
    .controller('tmDialogMenuItemAdd', tmDialogMenuItemAdd)
    .controller('tmMenuItemDetailCtrl', tmMenuItemDetailCtrl)
    .name