states.$inject = ['$stateProvider'];

export default function states($stateProvider){
    $stateProvider
    .state('root.users', {
            url:'/users',
            
            views: {
                'content@': {
                    template: require('./users/users.jade'),
                    controller: 'tmUsersCtrl',
                    controllerAs: 'vm'
                }
                // ,
                // 'navigation@': {
                //     template: '<div></div>'
                // }
            }
        })
        
}
