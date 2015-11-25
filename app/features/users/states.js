states.$inject = ['$stateProvider'];

export default function states($stateProvider){
    $stateProvider
    .state('root.users', {
            url:'/users',
            
            views: {
                'content@': {
                    template: require('./users.jade')
                }
                // ,
                // 'navigation@': {
                //     template: '<div></div>'
                // }
            }
        })
        
}
