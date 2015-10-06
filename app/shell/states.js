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
                }
            }, 
            
            
        })
        
       
}