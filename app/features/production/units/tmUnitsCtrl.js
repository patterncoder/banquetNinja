
import ninjaSchemas from 'ninjaSchemas';

class tmUnitsCtrl {
    constructor($scope, tmListFactory) {

        var constructorArgs = {
            schema: ninjaSchemas.production.Ingredient,
            model: 'Unit',
            listView: 'root.units',
            detailView: 'root.unitDetail',
            addHeaderText: 'Add Unit',
            listTitle: 'Units',
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

        this.loadData(loadDataConfig, true).then(function (data) {});

        this.afterAddItemDialogClose = () => {
            this.loadData(loadDataConfig, true).then(function (data) {});
        };

  }

}

tmUnitsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmUnitsCtrl;