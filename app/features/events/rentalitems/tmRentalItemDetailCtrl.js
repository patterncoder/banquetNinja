import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmRentalItemDetailCtrl(
    $scope,
    $state,
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

    this.$scope.$watch(function () {
        return self.docSvc.isDirty();
    }, function (newVal, oldVal, scope) {
        if (newVal) {
            self.detailForm.$setDirty();
        } else {
            self.detailForm.$setPristine();
            self.detailForm.$setUntouched();
        }
    });

    this.loadData().then(function () {
        self.getDetailTitle();
    });

    this.getDetailTitle = function () {
        self.detailTitle = {
            leader: 'Rental Item: ',
            text: self.docSvc.doc.name
        };
    };




    return this;

}

tmRentalItemDetailCtrl.$inject = [
    '$scope',
    '$state',
    'tmDetailFactory',
    'tmRentalItemDocSvc'
];

export default tmRentalItemDetailCtrl;