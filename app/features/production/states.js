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
                conrollerAs: 'vm'
            }
        }
    })
    .state('root.menus', {
        url:'/menus',
        roles: ['gold', 'admin', 'superUser'],
        views: {
            'content@': {
                template: require('./menus/menus.jade')
            }
        }
    })
    .state('root.menuitems', {
        url:'/menuitems',
        roles: ['gold', 'admin', 'superUser'],
        views: {
            'content@': {
                template: require('./menuitems/menuitems.jade')
            }
        }
    })
        
}
