
/*
    settings we need:
    * tax
    * min gratuity
    * logos & branding
    * default deposit
*/

import ninjaSchemas from 'ninjaSchemas';
import tmIdentity from '../../../shell/account/tmIdentity';

class tmSettingsCtrl {
    constructor($scope, tmListFactory, $dataSource, tmIdentity) {

        var constructorArgs = {
            schema: ninjaSchemas.account.Company,
            model: 'Company',
            listView: 'root.settings',
            detailView: 'root.settingsDetail',
            addHeaderText: 'Add Setting',
            listTitle: 'Settings'
        };

        console.log("tmSettingsCtrl: tmIdentity:", tmIdentity);

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

    tmSettingsCtrl.$inject = ['$scope', 'tmListFactory', '$dataSource', 'tmIdentity'];

    export default tmSettingsCtrl;
