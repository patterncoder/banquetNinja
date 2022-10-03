import ninjaSchemas from 'ninjaSchemas';
import config from 'config';

class tmMenuGroupsCtrl {
    constructor($scope, tmListFactory, $http, $dataSource) {

        var constructorArgs = {
            schema: ninjaSchemas.production.MenuGroup,
            model: 'MenuGroup',
            listView: 'root.menugroups',
            detailView: 'root.menuGroupDetail',
            addHeaderText: 'Add Menu Group',
            listTitle: 'Menu Groups'
        };

        this.__proto__ = tmListFactory(constructorArgs);

        




        this.loadData({
            select: "name description active"
        }, true, true);

        // this.afterLoad = () => {
        //     if (this.items.length < 25) {
        //         this.activeFilter = "*";
        //     }
        //     this.loadSort();
        // };

    }

}

tmMenuGroupsCtrl.$inject = ['$scope', 'tmListFactory', '$http', '$dataSource'];

export default tmMenuGroupsCtrl;

