states.$inject = ['$stateProvider'];

export default function states($stateProvider){
    $stateProvider
    .state('root.menugroups', {
        url:'/menugroups',
        roles: ['gold', 'admin', 'superUser'],
        views: {
            'content@': {
                template: require('./menugroups/menugroups.jade'),
                controller: 'tmMenuGroupsCtrl',
                controllerAs: 'vm'
            }
        }
    })
    .state('root.menus', {
        url:'/menus',
        roles: ['gold', 'admin', 'superUser'],
        views: {
            'content@': {
                template: require('./menus/menus.jade'),
                controller: 'tmMenusCtrl',
                controllerAs: 'vm'
            }
        }
    })
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
    .state('menuItemDetail', {
            url: '/production/menuitems/:id',
            roles: ['gold', 'admin', 'superUser'],
            onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal){
                $modal.open({
                    animation: true,
                    template: require('apply!./menuitems/menuItem-detail.jade'),
                    controller: 'tmMenuItemDetailCtrl as vm',
                    resolve: {itemId: function(){return $stateParams.id;}},
                    size: 'fs'
                }).result.finally(function(){
                    $state.go('^');
                })
            }]
        }
        
    );
        
}
