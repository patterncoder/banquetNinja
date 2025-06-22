
import ninjaSchemas from 'ninjaSchemas';

class tmIngredientsCtrl {
    constructor($scope, tmListFactory) {

        var constructorArgs = {
            schema: ninjaSchemas.production.Ingredient,
            model: 'Ingredient',
            listView: 'root.ingredients',
            detailView: 'root.ingredientDetail',
            addHeaderText: 'Add Ingredient',
            listTitle: 'Ingredients',
            hideDetailButton: true
        };

        this.__proto__ = tmListFactory(constructorArgs);
        var self = this;


        let loadDataConfig = {
          select: "name categories storageLocations",
          "startsWith[name]": self.$stateParams.alpha || 'A',
          "sort[name]": 1
        };

        
        this.loadData(loadDataConfig, true).then(function (data) {});
        
        this.changeFilter = function (value) {
          self.$state.go(self.constructorArgs.listView, { alpha: value.value });
          var filter = {
              select: "name categories storageLocations",
              "startsWith[name]": value.value,
              "sort[name]": 1
          };
          this.loadData(filter, true);
        };

        this.sortOptions = [{ value: "name", text: "Sort by Name A-Z" }, { value: "-name", text: "Sort by Name Z-A" }];
        this.sortOrder = this.sortOptions[0].value;


        this.afterAddItemDialogClose = () => {
            this.loadData(loadDataConfig, true);
        };

    }

}

tmIngredientsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmIngredientsCtrl;