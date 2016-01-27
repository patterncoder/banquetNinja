import config from 'config';
export default [
    '$dataSourceProvider', function($dataSourceProvider) {
        
        $dataSourceProvider.addApiRoute({
            key: 'Customer', 
            url: config.apiBase + '/customers/:_id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                        query: { method: 'GET', isArray: false}}
        });
    }
]
