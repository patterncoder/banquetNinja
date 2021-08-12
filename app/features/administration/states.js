states.$inject = ['$stateProvider'];

export default function states($stateProvider){
    $stateProvider
    .state('root.users', {
            url:'/users',
            roles: ['admin', 'superUser', 'bronze'],
            views: {
                'content@': {
                    template: require('./users/users.jade'),
                    controller: 'tmUsersCtrl',
                    controllerAs: 'vm'
                }
            }
        })
    // .state('root.company', {
    //         url:'/company',
    //         roles: ['admin', 'superUser', 'bronze'],
    //         views: {
    //             'content@': {
    //                 template: require('./settings/settings.jade'),
    //                 controller: 'tmSettingsCtrl',
    //                 controllerAs: 'vm'
    //             }
    //         }
    //     })
    .state('root.companyDetail', {
        url: '/company/:id',
        roles: ['admin', 'superUser', 'bronze'],
        isModal: true,
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
            roles: ['admin', 'superUser', 'bronze'],
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
            roles: ['admin', 'superUser', 'bronze'],
            views: {
                'content@': {
                    template: require('./lookups/lookups-detail.jade'),
                    controller: 'tmLookupsDetailCtrl',
                    controllerAs: 'vm'
                }
            }
        });
        
}
