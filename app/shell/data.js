import config from 'config';
export default [
    '$dataSourceProvider', function($dataSourceProvider) {
        
        $dataSourceProvider.addApiRoute({
            key: 'User', 
            url: config.apiBase + '/users/:id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false },
                    query: { method: 'GET', isArray: false}},
            extensions: [{key: "isAdmin", method: function () {
                return this.roles && this.roles.indexOf("admin") > -1;}}]
        });
    }
]