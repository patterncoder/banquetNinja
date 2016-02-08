import ninjaSchemas from 'ninjaSchemas';
class tmMenuItemsCtrl {
    constructor($scope, tmListFactory){
        var constructorArgs = {
            schema: ninjaSchemas.production.MenuItem,
            model: 'MenuItem',
            listView: 'root.menuitems',
            detailView: 'root.menuItemDetail',
            addHeaderText: 'Add Menu Item',
            listTitle: 'Menu Items'
        };
        
        this.__proto__ = tmListFactory(constructorArgs);
        this.loadData();
    }
}

tmMenuItemsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenuItemsCtrl;