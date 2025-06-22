import config from 'config';
export default [
    '$dataSourceProvider', function($dataSourceProvider) {
        
        $dataSourceProvider.addApiRoute({
            key: 'MenuGroup', 
            url: config.apiBase + '/production/menugroups/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
        $dataSourceProvider.addApiRoute({
            key: 'MenuItem', 
            url: config.apiBase + '/production/menuitems/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });// get route only...the api enpoint just returns distinct category values
        $dataSourceProvider.addApiRoute({
            key: 'MenuItemCategories',
            url: config.apiBase + '/production/menuitems/categories',
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        })
        $dataSourceProvider.addApiRoute({
            key: 'Menu', 
            url: config.apiBase + '/production/menus/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
        $dataSourceProvider.addApiRoute({
            key: 'Ingredient', 
            url: config.apiBase + '/production/ingredients/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
        // get route only...the api enpoint just returns distinct category values
        $dataSourceProvider.addApiRoute({
            key: 'IngredientCategories',
            url: config.apiBase + '/production/ingredients/categories',
            
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        })
        // get route only...the api enpoint just returns distinct category values
        $dataSourceProvider.addApiRoute({
            key: 'IngredientStorageLocations',
            url: config.apiBase + '/production/ingredients/storageLocations',
            
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        })
        $dataSourceProvider.addApiRoute({
            key: 'Recipe', 
            url: config.apiBase + '/production/recipes/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
        // get route only...the api enpoint just returns distinct category values
        $dataSourceProvider.addApiRoute({
            key: 'RecipeCategories',
            url: config.apiBase + '/production/recipes/categories',
            
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        })
        // get route only...the api enpoint just returns distinct category values
        $dataSourceProvider.addApiRoute({
            key: 'RecipeStations',
            url: config.apiBase + '/production/recipes/stations',
            
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        })
        $dataSourceProvider.addApiRoute({
            key: 'Unit', 
            url: config.apiBase + '/production/units/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
    }
]
