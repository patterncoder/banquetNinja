import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmRecipeDetailCtrl(
    $scope,
    $dataSource,
    tmDetailFactory,
    tmRecipeDocSvc
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        $dataSource: $dataSource,
        docSvc: tmRecipeDocSvc,
        schema: ninjaSchemas.production.Recipe,
        model: "Recipe",
        listView: "root.recipes",
        detailView: "root.recipeDetail",
        addHeaderText: "Add Recipe"
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



    this.loadData().then(() => {});


    return this;

}

tmRecipeDetailCtrl.$inject = [
    '$scope',
    '$dataSource',
    'tmDetailFactory',
    'tmRecipeDocSvc'
];

export default tmRecipeDetailCtrl;