export default ['navigationProvider', function(navigationProvider){
        
        
        
        navigationProvider.addNav({
            name: 'Customers',
            sortOrder: 10,
            sref: 'root.customers',
            parent: 'Customer Admin',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser']
        });
        
    }]