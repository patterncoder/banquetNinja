states.$inject = ['$stateProvider'];

export default function states($stateProvider) {
    $stateProvider
        .state('root', {
            url: '',
            abstract: true,
            views: {
                'header': {
                    template: require('jade!./header/header.jade'),
                    controller: function(){}
                },
                'footer': {
                    template: require('jade!./footer/footer.jade')
                }
            },
            
            
        })
        
       
}