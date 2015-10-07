states.$inject = ['$stateProvider'];

export default function states($stateProvider){
    $stateProvider
    .state('root.home', {
            url:'/',
            
            views: {
                'content@': {template: require('./home.jade')},
            }
            
        })
        .state('root.gatewood', {
            url:'/gatewood',
            views: {
                'content@': {
                    template: "<h1> hello from gatewood 443940 </h1>"
                }
            }
            
            
        })
}


// 'content@': {template: "<h2>dev server</h2><h1> I have made it home </h1><a ui-sref=root.login>Login</a> {{title}} <a ui-sref=root.gatewood>Show gatewood</a><a ui-sref=root.menugroups>Show menuGroups</a><a ui-sref=root.menus>Show menus</a>",
//                         controller: ['$scope',function($scope){$scope.title = 'here is the scope title';}]
//                     },
//                 //'header@': {template: "<h1> I have overridden the header </h1>"}
