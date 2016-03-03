import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmContractDetailCtrl (
    $scope,
    tmDetailFactory,
    tmContractDocSvc,
    $timeout
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmContractDocSvc,
        schema: ninjaSchemas.events.Contract,
        model: "Contract",
        listView: "root.contracts",
        detailView: "root.contractDetail",
        addHeaderText: "Add Contract"
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
        self.detailTitle = self.docSvc.doc.customer.lastName + ' - ' + self.docSvc.doc.eventName;
    };
    
    this.detailBlur = function (item, index, event) {
        var relatedTarget = event.relatedTarget || event.explicitOriginalTarget;
        if (relatedTarget == null || event.target.parentElement.parentElement != relatedTarget.parentElement.parentElement ) {
            $timeout(function(){delete item.isEditing;}, 100)
            
        } 
    }
    
    this.doneEditing = function(item){
        delete item.isEditing;
        delete item.clickedField;
    };
    
    this.editMenuItem = function (item, index, clickedField){
        item.isEditing = true;
        item.clickedField = {};
        item.clickedField[clickedField] = true;
    }
    
    this.deleteMenuItem = function (index){
        this.docSvc.removeMenuItem(index);
    };
    
    
    return this;
    
}

tmContractDetailCtrl.$inject = [
    '$scope',
    'tmDetailFactory',
    'tmContractDocSvc',
    '$timeout'
];

export default tmContractDetailCtrl;