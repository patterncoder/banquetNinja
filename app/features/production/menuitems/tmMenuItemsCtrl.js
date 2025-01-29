import ninjaSchemas from 'ninjaSchemas';
class tmMenuItemsCtrl {
    constructor($scope, tmListFactory) {
        var constructorArgs = {
            schema: ninjaSchemas.production.MenuItem,
            model: 'MenuItem',
            listView: 'root.menuitems',
            detailView: 'root.menuItemDetail',
            addHeaderText: 'Add Menu Item',
            listTitle: 'Menu Items',
            hideDetailButton: true
        };

        this.__proto__ = tmListFactory(constructorArgs);
        var self = this;

        this.sortOptions = [ { value: "name", text: "Sort by Item" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        this.sortOrder = this.sortOptions[0].value;


        let loadDataConfig = {
          select: "name title description active",
          "startsWith[name]":self .$stateParams.alpha || 'A',
          "sort[name]": 1
        };

        
        this.changeFilter = function (value) {
            self.$state.go(self.constructorArgs.listView, { alpha: value.value });
            var filter = {
                select: "name title description active",
                "sort[name]": 1,
                "startsWith[name]": value.value,
            };
            this.loadData(filter, true);
        };


        this.loadData(loadDataConfig, true, true);
    }
}

tmMenuItemsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenuItemsCtrl;