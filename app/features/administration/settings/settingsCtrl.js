
/*
    settings we need:
    * tax
    * min gratuity
    * logos & branding
    * default deposit
*/

import ninjaSchemas from 'ninjaSchemas';

class tmUsersCtrl {
    constructor($scope, tmListFactory, $dataSource) {

        var constructorArgs = {
            schema: ninjaSchemas.account.Settings,
            model: 'Setting',
            listView: 'root.settings',
            detailView: 'root.settingsDetail',
            addHeaderText: 'Add Setting',
            listTitle: 'Settings'
        };

        this.__proto__ = tmListFactory(constructorArgs);
        this.loadData();
        // this.schemaExtensions = {
        //     password: {
        //         type: String,
        //         caption: 'Password',
        //         minlength: [8, 'The password must be at least 8 characters'],
        //         required: 'Password is required',
        //         tabOrder: 40
        //     }
        // };


    }
}

    tmUsersCtrl.$inject = ['$scope', 'tmListFactory', '$dataSource'];

    export default tmUsersCtrl;
