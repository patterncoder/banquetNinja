states.$inject = ['$stateProvider'];
//comment
export default function states($stateProvider) {
    $stateProvider
        .state('root', {
            url: '',
            abstract: true,
            views: {
                'header': {
                    template: require('./header/header.jade')
                },
                'footer': {
                    template: require('./footer/footer.jade')
                },
                'navigation': {
                    template: require('./content/navigation.jade')
                }
                
            }, 
            
            
        })
        .state('root.login',{
            url: '/login',
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
            views: {
                'content@': {
                    template: require('./account/signup.jade'),
                    controller: 'tmSignupCtrl',
                    controllerAs: 'vm'
                }
            }
        })
        
       
}