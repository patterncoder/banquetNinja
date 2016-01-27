import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmMenuDetailCtrl (
    $scope,
    tmDetailFactory,
    tmMenuDocSvc
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmMenuDocSvc,
        schema: ninjaSchemas.production.Menu,
        model: "Menu",
        listView: "root.menus",
        detailView: "root.menuDetail",
        addHeaderText: "Add Menu"
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
    
    this.loadData();
    
    return this;
    
}

tmMenuDetailCtrl.$inject = [
    '$scope',
    'tmDetailFactory',
    'tmMenuDocSvc'
];

export default tmMenuDetailCtrl;