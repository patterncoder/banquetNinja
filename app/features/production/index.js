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

import tmIngredientsCtrl from './ingredients/tmIngredientsCtrl';
import tmIngredientDetailCtrl from './ingredients/tmIngredientDetailCtrl';
import tmRecipesCtrl from './recipes/tmRecipesCtrl';
import tmRecipeDetailCtrl from './recipes/tmRecipeDetailCtrl';
import tmUnitsCtrl from './units/tmUnitsCtrl';
import tmUnitDetailCtrl from './units/tmUnitDetailCtrl';
import tmUnitDocSvc from './units/tmUnitDocSvc';



export default angular.module('production', [uirouter])
    
    .config(states)
    .config(nav)
    .config(data)
    .factory('tmMenuItemDocSvc', tmMenuItemDocSvc)
    .factory('tmMenuDocSvc', tmMenuDocSvc)
    .factory('tmMenuGroupDocSvc', tmMenuGroupDocSvc)
    .factory('tmUnitDocSvc', tmUnitDocSvc)
    .controller('tmMenuGroupDetailCtrl', tmMenuGroupDetailCtrl)
    .controller('tmMenuDetailCtrl', tmMenuDetailCtrl)
    .controller('tmMenuGroupsCtrl', tmMenuGroupsCtrl)
    .controller('tmMenuItemsCtrl', tmMenuItemsCtrl)
    .controller('tmMenusCtrl', tmMenusCtrl)
    //.controller('tmModalMenuItemAdd', tmModalMenuItemAdd)
    .controller('tmDialogMenuItemAdd', tmDialogMenuItemAdd)
    .controller('tmMenuItemDetailCtrl', tmMenuItemDetailCtrl)
    .controller('tmIngredientsCtrl', tmIngredientsCtrl)
    .controller('tmIngredientDetailCtrl', tmIngredientDetailCtrl)
    .controller('tmRecipesCtrl', tmRecipesCtrl)
    .controller('tmRecipeDetailCtrl', tmRecipeDetailCtrl)
    .controller('tmUnitsCtrl', tmUnitsCtrl)
    .controller('tmUnitDetailCtrl', tmUnitDetailCtrl)
    .name