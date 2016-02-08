import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmRentalItemDetailCtrl (
    $scope,
    tmDetailFactory,
    tmRentalItemDocSvc
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmRentalItemDocSvc,
        schema: ninjaSchemas.events.RentalItem,
        model: "RentalItem",
        listView: "root.rentalitems",
        detailView: "root.rentalitemDetail",
        addHeaderText: "Add Rental Item"
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

tmRentalItemDetailCtrl.$inject = [
    '$scope',
    'tmDetailFactory',
    'tmRentalItemDocSvc'
];

export default tmRentalItemDetailCtrl;