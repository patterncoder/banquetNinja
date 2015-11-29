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
        
}
