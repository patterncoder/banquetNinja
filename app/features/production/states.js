import angular from 'angular';

states.$inject = ['$stateProvider'];

export default function states($stateProvider){
    $stateProvider
    .state('root.menugroups', {
        url:'/menugroups',
        roles: ['gold', 'admin', 'superUser'],
        views: {
            'content@': {
                template: require('./menugroups/menugroups-list.jade'),
                controller: 'tmMenuGroupsCtrl',
                controllerAs: 'vm'
            }
        }
    })
    .state('root.menuGroupDetail', {
            url: '/production/menusgroups/:id',
            roles: ['gold', 'admin', 'superUser'],
            // Can't remember how the isModal flag works...I'm getting alzheimers!
            // Oh yeah!!! in the index.html master page the header/nav/footer are visible
            // when the isModal is false
            isModal: true,
            views: {
            'content@': {
                template: require('./menugroups/menugroup-detail.jade'),
                controller: 'tmMenuGroupDetailCtrl',
                controllerAs: 'vm'
                }
            }
        }
    )
    .state('root.menus', {
        url:'/menus',
        roles: ['gold', 'admin', 'superUser'],
        views: {
            'content@': {
                template: require('./menus/menus-list.jade'),
                controller: 'tmMenusCtrl',
                controllerAs: 'vm'
            }
        }
    })
    .state('root.menuDetail', {
            url: '/production/menus/:id',
            roles: ['gold', 'admin', 'superUser'],
            // Can't remember how the isModal flag works...I'm getting alzheimers!
            // Oh yeah!!! in the index.html master page the header/nav/footer are visible
            // when the isModal is false
            isModal: true,
            views: {
            'content@': {
                template: require('./menus/menu-detail.jade'),
                controller: 'tmMenuDetailCtrl',
                controllerAs: 'vm'
                }
            }
        }
    )
    .state('root.menuitems', {
        url:'/menuitems',
        roles: ['gold', 'admin', 'superUser'],
        views: {
            'content@': {
                template: require('./menuitems/menuItems-list.jade'),
                controller: 'tmMenuItemsCtrl',
                controllerAs: 'vm'
            }
        }
    })
    .state('root.menuItemDetail', {
            url: '/production/menuitems/:id',
            roles: ['gold', 'admin', 'superUser'],
            // Can't remember how the isModal flag works...I'm getting alzheimers!
            // Oh yeah!!! in the index.html master page the header/nav/footer are visible
            // when the isModal is false
            isModal: true,
            views: {
            'content@': {
                template: require('./menuitems/menuItem-detail.jade'),
                controller: 'tmMenuItemDetailCtrl',
                controllerAs: 'vm'
                }
            }
        }
    )
    .state('root.ingredients', {
        url:'/production/ingredients',
        roles: ['gold', 'admin', 'superUser'],
        views: {
            'content@': {
                template: require('./ingredients/ingredients-list.jade'),
                controller: 'tmIngredientsCtrl',
                controllerAs: 'vm'
            }
        }
    })
    .state('root.recipes', {
        url:'/production/recipes',
        roles: ['gold', 'admin', 'superUser'],
        views: {
            'content@': {
                template: require('./recipes/recipes-list.jade'),
                controller: 'tmRecipesCtrl',
                controllerAs: 'vm'
            }
        }
    })
    .state('root.units', {
        url:'/production/units',
        roles: ['gold', 'admin', 'superUser'],
        views: {
            'content@': {
                template: require('./units/units-list.jade'),
                controller: 'tmUnitsCtrl',
                controllerAs: 'vm'
            }
        }
    })
    .state('root.unitDetail', {
            url: '/production/units/:id',
            roles: ['gold', 'admin', 'superUser'],
            isModal: true,
            views: {
            'content@': {
                template: require('./units/unit-detail.jade'),
                controller: 'tmUnitDetailCtrl',
                controllerAs: 'vm'
                }
            }
        }
    )
    // .state('root.ingredientDetail', {
    //     url: '/production/ingredients/:id',
    //     roles: ['gold', 'admin', 'superUser'],
    //     isModal: true,
    //     views: {
    //     'content@': {
    //         template: require('./ingredients/ingredient-detail.jade'),
    //         controller: 'tmIngredientDetailCtrl',
    //         controllerAs: 'vm'
    //         }
    //     }
    // })
        
}
