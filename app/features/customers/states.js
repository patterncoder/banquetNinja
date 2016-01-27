import angular from 'angular';

states.$inject = ['$stateProvider'];

export default function states($stateProvider){
    $stateProvider
    
    .state('root.customers', {
            url: '/customers',
            roles: ['gold', 'admin', 'superUser'],
            // Can't remember how the isModal flag works...I'm getting alzheimers!
            // Oh yeah!!! in the index.html master page the header/nav/footer are visible
            // when the isModal is false
            isModal: false,
            views: {
            'content@': {
                template: require('./customers/customers-list.jade'),
                controller: 'tmCustomersCtrl',
                controllerAs: 'vm'
                }
            }
        }
    )
    .state('root.customerDetail', {
            url: '/customers/:id',
            roles: ['gold', 'admin', 'superUser'],
            // Can't remember how the isModal flag works...I'm getting alzheimers!
            // Oh yeah!!! in the index.html master page the header/nav/footer are visible
            // when the isModal is false
            isModal: true,
            views: {
            'content@': {
                template: require('./customers/customer-detail.jade'),
                controller: 'tmCustomerDetailCtrl',
                controllerAs: 'vm'
                }
            }
        }
    );;
    
        
}
