export default ['navigationProvider', function(navigationProvider){
        
        
        
        navigationProvider.addNav({
            name: 'Menu Groups',
            sortOrder: 30,
            sref: 'root.menugroups',
            parent: 'Production',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'Menus',
            sortOrder: 40,
            sref: 'root.menus',
            parent: 'Production',
            endSection: true,
            roles: ['gold', 'admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'Menu Items',
            sortOrder: 50,
            sref: 'root.menuitems',
            parent: 'Production',
            endSection: true,
            roles: [ 'gold', 'admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'Recipes',
            sortOrder: 50,
            sref: 'root.recipes',
            parent: 'Production',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'Ingredients',
            sortOrder: 50,
            sref: 'root.ingredients',
            parent: 'Production',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser']
        });
        navigationProvider.addNav({
            name: 'Units',
            sortOrder: 50,
            sref: 'root.units',
            parent: 'Production',
            endSection: false,
            roles: [ 'gold', 'admin', 'superUser']
        });
        
    }]