states.$inject = ['$stateProvider'];

export default function states($stateProvider){
    $stateProvider
    .state('root.home', {
            url:'/',
            
            views: {
                'content@': {template: require('./home.jade')},
            }
            
        })
        
}
