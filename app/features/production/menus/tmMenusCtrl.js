
import ninjaSchemas from 'ninjaSchemas';

class tmMenusCtrl {
    constructor($scope, tmListFactory){
        
        var constructorArgs = {
            schema: ninjaSchemas.production.Menu,
            model: 'Menu',
            listView: 'root.menus',
            detailView: 'root.menuDetail',
            addHeaderText: 'Add Menu',
            listTitle: 'Menus'
        };
        
        this.__proto__ = tmListFactory(constructorArgs);
        this.loadData();
        
    }
    
}

tmMenusCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenusCtrl;