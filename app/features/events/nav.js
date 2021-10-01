export default ['navigationProvider', function(navigationProvider){
        
        
        
        navigationProvider.addNav({
            name: 'Bids',
            sortOrder: 10,
            sref: 'root.contractsPending',
            parent: 'Events',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser', 'bronze']
        });
        navigationProvider.addNav({
            name: 'Contracts',
            sortOrder: 20,
            sref: 'root.contracts',
            parent: 'Events',
            endSection: true,
            roles: [ 'gold', 'admin', 'superUser', 'bronze']
        });
        navigationProvider.addNav({
            name: 'Venues',
            sortOrder: 30,
            sref: 'root.venues',
            parent: 'Events',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser', 'bronze']
        });
        navigationProvider.addNav({
            name: 'Rental Items',
            sortOrder: 40,
            sref: 'root.rentalitems',
            parent: 'Events',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser', 'bronze']
        });
        navigationProvider.addNav({
            name: 'Staff Members',
            sortOrder: 50,
            sref: 'root.staffMembers',
            parent: 'Events',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser', 'bronze']
        });
        
    }]
