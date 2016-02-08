export default ['navigationProvider', function(navigationProvider){
        
        
        
        navigationProvider.addNav({
            name: 'Users',
            sortOrder: 30,
            sref: 'root.users',
            parent: 'Administration',
            endSection: false,
            roles: [ 'admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'Lookups',
            sortOrder: 40,
            sref: 'root.lookups',
            parent: 'Administration',
            endSection: false,
            roles: [ 'admin', 'superUser']
        });
        
    }]