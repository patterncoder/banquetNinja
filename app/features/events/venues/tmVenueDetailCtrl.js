import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmVenueDetailCtrl (
    $scope,
    tmDetailFactory,
    tmVenueDocSvc
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmVenueDocSvc,
        schema: ninjaSchemas.events.Venue,
        model: "Venue",
        listView: "root.venues",
        detailView: "root.venueDetail",
        addHeaderText: "Add Venue"
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

tmVenueDetailCtrl.$inject = [
    '$scope',
    'tmDetailFactory',
    'tmVenueDocSvc'
];

export default tmVenueDetailCtrl;