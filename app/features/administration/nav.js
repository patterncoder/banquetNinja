export default ['navigationProvider', function(navigationProvider){
        
        
        
        navigationProvider.addNav({
            name: 'Users',
            sortOrder: 30,
            sref: 'root.users',
            parent: 'Administration',
            endSection: false,
            roles: [ 'admin', 'superUser', 'bronze']
        });
        navigationProvider.addNav({
            name: "Settings",
            sortOrder: 40,
            sref: "root.companyDetail",
            parent: "Administration",
            endSection: false,
            roles: ["admin", "superUser", 'bronze']
        });
        navigationProvider.addNav({
            name: 'Lookups',
            sortOrder: 50,
            sref: 'root.lookups',
            parent: 'Administration',
            endSection: false,
            roles: [ 'admin', 'superUser', 'bronze']
        });
        
    }]