import angular from 'angular';

states.$inject = ['$stateProvider'];

export default function states($stateProvider){
    $stateProvider
    
    .state('root.contracts', {
            url: '/events/contracts',
            roles: ['gold', 'admin', 'superUser'],
            // Can't remember how the isModal flag works...I'm getting alzheimers!
            // Oh yeah!!! in the index.html master page the header/nav/footer are visible
            // when the isModal is false
            isModal: false,
            views: {
            'content@': {
                template: require('./contracts/contracts-list.jade'),
                controller: 'tmContractsCtrl',
                controllerAs: 'vm'
                }
            }
        }
    )
    .state('root.contractDetail', {
            url: '/events/contracts/:id',
            roles: ['gold', 'admin', 'superUser'],
            // Can't remember how the isModal flag works...I'm getting alzheimers!
            // Oh yeah!!! in the index.html master page the header/nav/footer are visible
            // when the isModal is false
            isModal: true,
            views: {
            'content@': {
                template: require('./contracts/contract-detail.jade'),
                controller: 'tmContractDetailCtrl',
                controllerAs: 'vm'
                }
            }
        }
    )
    .state('root.venues', {
            url: '/events/venues',
            roles: ['gold', 'admin', 'superUser'],
            // Can't remember how the isModal flag works...I'm getting alzheimers!
            // Oh yeah!!! in the index.html master page the header/nav/footer are visible
            // when the isModal is false
            isModal: false,
            views: {
            'content@': {
                template: require('./venues/venues-list.jade'),
                controller: 'tmVenuesCtrl',
                controllerAs: 'vm'
                }
            }
        }
    )
    .state('root.venueDetail', {
            url: '/events/venues/:id',
            roles: ['gold', 'admin', 'superUser'],
            // Can't remember how the isModal flag works...I'm getting alzheimers!
            // Oh yeah!!! in the index.html master page the header/nav/footer are visible
            // when the isModal is false
            isModal: true,
            views: {
            'content@': {
                template: require('./venues/venue-detail.jade'),
                controller: 'tmVenueDetailCtrl',
                controllerAs: 'vm'
                }
            }
        }
    )
    .state('root.rentalitems', {
            url: '/events/rentalitems',
            roles: ['gold', 'admin', 'superUser'],
            // Can't remember how the isModal flag works...I'm getting alzheimers!
            // Oh yeah!!! in the index.html master page the header/nav/footer are visible
            // when the isModal is false
            isModal: false,
            views: {
            'content@': {
                template: require('./rentalitems/rentalitems-list.jade'),
                controller: 'tmRentalItemsCtrl',
                controllerAs: 'vm'
                }
            }
        }
    )
    .state('root.rentalitemDetail', {
            url: '/events/rentalitems/:id',
            roles: ['gold', 'admin', 'superUser'],
            // Can't remember how the isModal flag works...I'm getting alzheimers!
            // Oh yeah!!! in the index.html master page the header/nav/footer are visible
            // when the isModal is false
            isModal: true,
            views: {
            'content@': {
                template: require('./rentalitems/rentalitem-detail.jade'),
                controller: 'tmRentalItemDetailCtrl',
                controllerAs: 'vm'
                }
            }
        }
    );
    
        
}
