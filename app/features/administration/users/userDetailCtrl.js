import ninjaSchemas from 'ninjaSchemas';

class tmUserDetailCtrl {
  constructor($scope,tmDetailFactory,tmUserDocSvc){
    $scope.enumValues = ninjaSchemas.account.User.paths.roles.enumValues.map((status)=> status);
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmUserDocSvc,
        schema: ninjaSchemas.account.User,
        model: "User",
        listView: "root.users",
        detailView: "root.userDetail",
        addHeaderText: "Add User"
    }
    
    this.__proto__ = tmDetailFactory(constructorArgs);
    
    this.$scope.$watch(function(){
        return self.docSvc.isDirty();
    }, function(newVal, oldVal,  scope){
        if(newVal){
            self.detailForm.$setDirty();
        } else {
            self.detailForm.$setPristine();
            self.detailForm.$setUntouched();
        }
    });  
    
    this.loadData().then(function(){
        self.getDetailTitle();
    });

    this.getDetailTitle = function(){
        self.detailTitle = {
            leader: 'User: ',
            text: self.docSvc.doc.lastName + ', ' + self.docSvc.doc.firstName
        };
    };
            
    return this;
  }
}

tmUserDetailCtrl.$inject = ['$scope','tmDetailFactory','tmUserDocSvc'];

export default tmUserDetailCtrl;