import config from 'config';
export default [
    '$dataSourceProvider', function($dataSourceProvider) {
        
        $dataSourceProvider.addApiRoute({
            key: 'MenuGroup', 
            url: config.apiBase + '/production/menugroups/:id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false }}
        });
        $dataSourceProvider.addApiRoute({
            key: 'MenuItem', 
            url: config.apiBase + '/production/menuitems/:id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false }}
        });
        $dataSourceProvider.addApiRoute({
            key: 'Menu', 
            url: config.apiBase + '/production/menus/:id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false }}
        });
    }
]