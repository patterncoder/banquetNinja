import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmVenueDetailCtrl (
    $scope,
    $state,
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
    
    //close overrides from tmDetailFactory.js
    this.close = () => {
        this.canILeave().then((result) => {
            if (result) {

                let backState = $state.back.fromState.name;

                this.docSvc.clearDocument();
                if (backState && backState != "") {
                    this.$state.go(backState, $state.back.fromParams);
                } else {
                    this.$state.go(constructorArgs.listView);
                }
            }
        });
    };

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
    
    this.loadData().then(function () {
        // running code here happens after the detail doc has been loaded
        self.getDetailTitle();
    });

    this.getDetailTitle = function () {
        self.detailTitle = {
            leader: 'Venue Detail: ',
            text: self.docSvc.doc.name
        };
    };
    return this;
    
}

tmVenueDetailCtrl.$inject = [
    '$scope',
    '$state',
    'tmDetailFactory',
    'tmVenueDocSvc'
];

export default tmVenueDetailCtrl;