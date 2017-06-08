import config from 'config';
export default [
    '$dataSourceProvider', function($dataSourceProvider) {
        
        $dataSourceProvider.addApiRoute({
            key: 'Lookups', 
            url: config.apiBase + '/common/lookups', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false},
                        query: { method: 'GET', isArray: false}}
        });
        $dataSourceProvider.addApiRoute({
            key: 'Users', 
            url: config.apiBase + '/users/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });        
    }
]


