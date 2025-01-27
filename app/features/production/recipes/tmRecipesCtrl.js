
import ninjaSchemas from 'ninjaSchemas';

class tmRecipesCtrl {
    constructor($scope, tmListFactory) {

        var constructorArgs = {
            schema: ninjaSchemas.production.Recipe,
            model: 'Recipe',
            listView: 'root.recipes',
            detailView: 'root.recipeDetail',
            addHeaderText: 'Add Recipe',
            listTitle: 'Recipes',
            hideDetailButton: true
        };

        this.__proto__ = tmListFactory(constructorArgs);
        var self = this;

        let loadDataConfig = {
          select: "name",
          "sort[name]": 1
        };

        this.sortOptions = [{ value: "name", text: "Sort by Name A-Z" }, { value: "-name", text: "Sort by Name Z-A" }];
        this.sortOrder = this.sortOptions[0].value;

        this.loadData(loadDataConfig, true);

        this.afterAddItemDialogClose = () => {
            this.loadData(loadDataConfig, true);
        };

    }

}

tmRecipesCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmRecipesCtrl;