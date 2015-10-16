
export default ['navigationProvider', function(navigationProvider){
        
        
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
            name: 'Login',
            sortOrder: 30,
            sref: 'root.login',
            parent: 'Events',
            endSection: false,
            roles: ['bronze', 'silver', 'gold', 'admin', 'superUser']
        });
    }]
    
// name: String
// ui-sref: String
// sortOrder: Number
// parent: String
// endSection: Boolean
// securityLevel: string