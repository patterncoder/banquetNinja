states.$inject = ['$stateProvider'];
//comment
export default function states($stateProvider) {
    $stateProvider
        .state('root', {
            url: '',
            abstract: true,
            views: {
                'header': {
                    template: require('./header/header.jade'),
                    controller: 'tmLoginCtrl as vm'
                },
                'footer': {
                    template: require('./footer/footer.jade'),
                    controller: 'tmFooterCtrl as vm'
                },
                'navigation': {
                    template: require('./content/navigation.jade'),
                    controller: 'tmNavigationCtrl',
                    controllerAs: 'vm'
                }
            }, 
        })
        .state('root.login',{
            url: '/login',
            prohibitStateWhenLoggedIn: true,
            views: {
                'content@': {
                    template: require('./account/login.jade')
                },
                'footer@': {
                    template: require('./footer/footer2.jade')
                }
            }
        })
        .state('root.signup', {
            url: '/signup',
            prohibitStateWhenLoggedIn: true,
            views: {
                'content@': {
                    template: require('./account/signup.jade'),
                    controller: 'tmSignupCtrl',
                    controllerAs: 'vm'
                }
            }
        })
        .state('root.profile', {
            url: '/profile',
            prohibitStateWhenLoggedIn: false,
            views: {
                'content@': {
                    template: require('./account/profile.jade'),
                    controller: 'tmProfileCtrl',
                    controllerAs: '$ctrl'
                }
            }
        })
        
       
}