import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmContractDetailCtrl (
    $scope,
    tmDetailFactory,
    tmContractDocSvc
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
    
    return this;
    
}

tmContractDetailCtrl.$inject = [
    '$scope',
    'tmDetailFactory',
    'tmContractDocSvc'
];

export default tmContractDetailCtrl;