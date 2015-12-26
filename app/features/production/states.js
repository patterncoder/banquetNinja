import angular from 'angular';

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
        isModal: true,
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
    // .state('menuItemDetail', {
    //         url: '/production/menuitems/:id',
    //         roles: ['gold', 'admin', 'superUser'],
    //         onEnter: ['$stateParams', '$state', '$modal', '$mdDialog',  function($stateParams, $state, $modal, $mdDialog){
                
    //             var parentEl = angular.element(document.body);
    //             $mdDialog.show({
    //                 parent: parentEl,
    //                 template: require('apply!./menuitems/menuItem-detail.jade'),
    //                 locals: {
    //                 },
    //                 fullscreen: true,
    //                 controller: 'tmMenuItemDetailCtrl as vm'
    //             });
    //             // $modal.open({
    //             //     animation: true,
    //             //     template: require('apply!./menuitems/menuItem-detail.jade'),
    //             //     controller: 'tmMenuItemDetailCtrl as vm',
    //             //     resolve: {itemId: function(){return $stateParams.id;}},
    //             //     size: 'fs'
    //             // }).result.finally(function(){
    //             //     $state.go('^');
    //             // })
    //         }]
    //     }
    // );
    .state('root.menuItemDetail', {
            url: '/production/menuitems/:id',
            roles: ['gold', 'admin', 'superUser'],
            isModal: true,
            views: {
            'content@': {
                template: require('./menuitems/menuItem-detail.jade'),
                controller: 'tmMenuItemDetailCtrl',
                controllerAs: 'vm'
            }
        }
        }
    );
        
}
