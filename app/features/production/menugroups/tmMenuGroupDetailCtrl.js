import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmMenuGroupDetailCtrl (
    $scope,
    tmDetailFactory,
    tmMenuGroupDocSvc
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmMenuGroupDocSvc,
        schema: ninjaSchemas.production.MenuGroup,
        model: "MenuGroup",
        listView: "root.menugroups",
        detailView: "root.menuGroupDetail",
        addHeaderText: "Add Menu Group"
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
    
    this.loadData().then(() => {
        this.docSvc.getMenus();
    });
    
    return this;
    
}

tmMenuGroupDetailCtrl.$inject = [
    '$scope',
    'tmDetailFactory',
    'tmMenuGroupDocSvc'
];

export default tmMenuGroupDetailCtrl;