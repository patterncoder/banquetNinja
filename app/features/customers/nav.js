export default ['navigationProvider', function(navigationProvider){
        
        
        
        navigationProvider.addNav({
            name: 'Master List',
            sortOrder: 10,
            sref: 'root.customers',
            parent: 'Customers',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser']
        });
        
    }]