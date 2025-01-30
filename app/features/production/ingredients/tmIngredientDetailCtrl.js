import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmIngredientDetailCtrl(
    $scope,
    $dataSource,
    tmDetailFactory,
    tmIngredientDocSvc
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        $dataSource: $dataSource,
        docSvc: tmIngredientDocSvc,
        schema: ninjaSchemas.production.Recipe,
        model: 'Ingredient',
        listView: 'root.ingredients',
        detailView: 'root.ingredientDetail',
        addHeaderText: "Add Ingredient"
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

    this.categoryPanelOpen = false;
    this.toggleCategoryPanelOpen = () => {
        this.categoryPanelOpen = !this.categoryPanelOpen;
    }

    this.loadData().then(() => {});


    return this;

}

tmIngredientDetailCtrl.$inject = [
    '$scope',
    '$dataSource',
    'tmDetailFactory',
    'tmIngredientDocSvc'
];

export default tmIngredientDetailCtrl;