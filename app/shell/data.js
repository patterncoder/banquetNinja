import config from 'config';
export default [
    '$dataSourceProvider', function($dataSourceProvider) {
        console.log('inproviderfunction');
        console.log(config.apiBase);
        $dataSourceProvider.addApiRoute({
            key: 'User', 
            url: config.apiBase + '/users/:id', 
            defaults: { _id: "@id" },
            methods: {update: { method: 'PUT', isArray: false }},
            extensions: [{key: "isAdmin", method: function () {
                return this.roles && this.roles.indexOf("admin") > -1;}}]
        });
    }
]