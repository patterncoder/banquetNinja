import ninjaSchemas from 'ninjaSchemas';

class tmContractsCtrl {
    constructor($scope, tmListFactory){
        
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
        
    }
    
}

tmContractsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmContractsCtrl;

// class tmUsersCtrl{
//     constructor($dataSource){
//         var self = this;
//         this.$datasource = $dataSource;
//         this.users = [];
//         this.title = "whats up dude";
//         var Users = $dataSource.load('User');
//         Users.query().then(function(data){
//             console.log(data);
//             self.users = data;
//         });
//     }
// }

// tmUsersCtrl.$inject = ['$dataSource'];

// export default tmUsersCtrl