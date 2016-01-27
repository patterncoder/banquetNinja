import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmCustomerDetailCtrl (
    $scope,
    tmDetailFactory,
    tmCustomerDocSvc
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmCustomerDocSvc,
        schema: ninjaSchemas.customer.Customer,
        model: "Customer",
        listView: "root.customers",
        detailView: "root.customerDetail",
        addHeaderText: "Add Customer"
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

tmCustomerDetailCtrl.$inject = [
    '$scope',
    'tmDetailFactory',
    'tmCustomerDocSvc'
];

export default tmCustomerDetailCtrl;