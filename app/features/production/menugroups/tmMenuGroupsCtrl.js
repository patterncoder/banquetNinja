import ninjaSchemas from 'ninjaSchemas';

class tmMenuGroupsCtrl {
    constructor($scope, tmListFactory){
        
        var constructorArgs = {
            schema: ninjaSchemas.production.MenuGroup,
            model: 'MenuGroup',
            listView: 'root.menugroups',
            detailView: 'root.menuGroupDetail',
            addHeaderText: 'Add Menu Group',
            
        };
        
        this.__proto__ = tmListFactory(constructorArgs);
        this.loadData();
        
    }
    
}

tmMenuGroupsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenuGroupsCtrl;

