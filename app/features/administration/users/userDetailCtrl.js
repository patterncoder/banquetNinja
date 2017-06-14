import ninjaSchemas from 'ninjaSchemas';

class tmUserDetailCtrl {
  constructor($scope,tmDetailFactory,tmUserDocSvc){
    // $scope.enumValues = ninjaSchemas.account.User.paths.roles.enumValues.map((status)=> status);
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

    this.sideTab = {
        roles: false
    };

    this.openSideTab = function(tab) {
        for (var k in this.sideTab) {
            this.sideTab[k] = false;
        }
        this.sideTab[tab] = true;
    };

    this.closeSideTab = function() {
        for (var k in this.sideTab) {
            this.sideTab[k] = false;
        }
    };        

    this.removeRoles = function(index){
        self.docSvc.removeRole(index);
    };

    this.arrowKeyOut = function(item, index, event, clickedField){
        if (event.keyCode == 38) {
            this.editMenuItem(this.docSvc.doc.menuItems[--index], index--, clickedField);
        }
        if (event.keyCode == 40) {
            this.editMenuItem(this.docSvc.doc.menuItems[++index], index++, clickedField);
        }
    };
    
    this.detailBlur = function (item, index, event) {
        var relatedTarget = event.relatedTarget || event.explicitOriginalTarget;
        if (relatedTarget == null || event.target.parentElement.parentElement != relatedTarget.parentElement.parentElement ) {
            $timeout(function(){
                delete item.isEditing;
                delete item.clickedField;
            }, 0);
            
        } 
    };

    return this;
  }
}

tmUserDetailCtrl.$inject = ['$scope','tmDetailFactory','tmUserDocSvc'];

export default tmUserDetailCtrl;