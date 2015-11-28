
export default ['navigationProvider', function(navigationProvider){
        
        navigationProvider.addNav({
            name: 'Customers',
            sortOrder: 10,
            sref: '',
            parent: null,
            endSection: false,
            roles: ['bronze', 'silver', 'gold', 'admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'Events',
            sortOrder: 20,
            sref: '',
            parent: null,
            endSection: false,
            roles: ['bronze', 'silver', 'gold', 'admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'Production',
            sortOrder: 30,
            sref: '',
            parent: null,
            endSection: false,
            roles: ['bronze', 'silver', 'gold', 'admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'User Admin',
            sortOrder: 100,
            sref: '',
            parent: null,
            endSection: false,
            roles: ['admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'Feature Admin',
            sortOrder: 100,
            sref: '',
            parent: null,
            endSection: false,
            roles: ['superUser']
        });
    }]
    
