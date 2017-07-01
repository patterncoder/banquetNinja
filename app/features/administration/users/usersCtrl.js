import ninjaSchemas from 'ninjaSchemas';

class tmUsersCtrl {
    constructor($scope, tmListFactory, $dataSource) {

        var constructorArgs = {
            schema: ninjaSchemas.account.User,
            model: 'User',
            listView: 'root.users',
            detailView: 'root.userDetail',
            addHeaderText: 'Add User',
            listTitle: 'Users'
        };

        this.__proto__ = tmListFactory(constructorArgs);
        this.loadData();
        this.schemaExtensions = {
            password: {
                type: String,
                caption: 'Password',
                minlength: [8, 'The password must be at least 8 characters'],
                required: 'Password is required',
                tabOrder: 40
            }
        };


    }
}

    tmUsersCtrl.$inject = ['$scope', 'tmListFactory', '$dataSource'];

    export default tmUsersCtrl;
