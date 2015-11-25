states.$inject = ['$stateProvider'];

export default function states($stateProvider){
    $stateProvider
    .state('root.menugroups', {
        url:'/menugroups',
        
        views: {
            'content@': {
                template: require('./menugroups/menugroups.jade')
            }
            // ,
            // 'navigation@': {
            //     template: '<div></div>'
            // }
        }
    })
    .state('root.menus', {
        url:'/menus',
        
        views: {
            'content@': {
                template: require('./menus/menus.jade')
            }
            // ,
            // 'navigation@': {
            //     template: '<div></div>'
            // }
        }
    })
    .state('root.menuitems', {
        url:'/menuitems',
        
        views: {
            'content@': {
                template: require('./menuitems/menuitems.jade')
            }
            // ,
            // 'navigation@': {
            //     template: '<div></div>'
            // }
        }
    })
        
}
