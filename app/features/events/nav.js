export default ['navigationProvider', function(navigationProvider){
        
        
        
        navigationProvider.addNav({
            name: 'Contracts',
            sortOrder: 10,
            sref: 'root.contracts',
            parent: 'Events',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'Venues',
            sortOrder: 10,
            sref: 'root.venues',
            parent: 'Events',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'Rental Items',
            sortOrder: 10,
            sref: 'root.rentalitems',
            parent: 'Events',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser']
        });
        
    }]