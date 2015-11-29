import config from 'config';
export default [
    '$dataSourceProvider', function($dataSourceProvider) {
        
        $dataSourceProvider.addApiRoute({
            key: 'MenuGroup', 
            url: config.apiBase + '/menugroups/:id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false }}
        });
    }
]