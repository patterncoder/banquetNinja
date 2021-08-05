states.$inject = ['$stateProvider'];

export default function states($stateProvider){
    $stateProvider
    .state('root.users', {
            url:'/users',
            roles: ['admin', 'superUser'],
            views: {
                'content@': {
                    template: require('./users/users.jade'),
                    controller: 'tmUsersCtrl',
                    controllerAs: 'vm'
                }
            }
        })
    .state('root.settings', {
            url:'/settings',
            roles: ['admin', 'superUser'],
            views: {
                'content@': {
                    template: require('./settings/settings-detail.jade'),
                    controller: 'tmSettingsDetailCtrl',
                    controllerAs: 'vm'
                }
            }
        })
    .state('root.userDetail', {
            url: '/users/:id',
            roles: ['admin', 'superUser'],
            isModal: true,
            views: {
            'content@': {
                template: require('./users/users-detail.jade'),
                controller: 'tmUserDetailCtrl',
                controllerAs: 'vm'
                }
            }
        })        
    .state('root.lookups', {
            url:'/lookups',
            roles: ['admin', 'superUser'],
            views: {
                'content@': {
                    template: require('./lookups/lookups-detail.jade'),
                    controller: 'tmLookupsDetailCtrl',
                    controllerAs: 'vm'
                }
            }
        });
        
}
