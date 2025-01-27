import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmUnitDetailCtrl(
    $scope,
    $dataSource,
    tmDetailFactory,
    tmUnitDocSvc
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        $dataSource: $dataSource,
        docSvc: tmUnitDocSvc,
        schema: ninjaSchemas.production.Unit,
        model: "Unit",
        listView: "root.units",
        detailView: "root.unitDetail",
        addHeaderText: "Add Unit"
    }

    this.__proto__ = tmDetailFactory(constructorArgs);
    this.$dataSource = $dataSource;

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



    this.loadData().then(() => {});


    return this;

}

tmUnitDetailCtrl.$inject = [
    '$scope',
    '$dataSource',
    'tmDetailFactory',
    'tmUnitDocSvc'
];

export default tmUnitDetailCtrl;