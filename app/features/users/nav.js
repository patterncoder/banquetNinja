export default ['navigationProvider', function(navigationProvider){
        
        
        
        navigationProvider.addNav({
            name: 'Users',
            sortOrder: 30,
            sref: 'root.users',
            parent: 'User Admin',
            endSection: false,
            roles: [ 'admin', 'superUser']
        });
        
    }]