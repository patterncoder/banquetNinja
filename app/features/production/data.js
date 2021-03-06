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
        });
        $dataSourceProvider.addApiRoute({
            key: 'Menu', 
            url: config.apiBase + '/production/menus/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
    }
]
