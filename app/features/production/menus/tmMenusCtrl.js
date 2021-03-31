
import ninjaSchemas from 'ninjaSchemas';

class tmMenusCtrl {
    constructor($scope, tmListFactory) {

        var constructorArgs = {
            schema: ninjaSchemas.production.Menu,
            model: 'Menu',
            listView: 'root.menus',
            detailView: 'root.menuDetail',
            addHeaderText: 'Add Menu',
            listTitle: 'Menus'
        };

        this.filter = "";

        console.log("tmMenusCtrl this:", this);

        let stripNums = (menuObj) => {
            let name = menuObj.name;
            let nwName = "";
            for (let i = 0; i < name.length; ++i) {
                if (isNaN(name[i])) {
                    nwName += name[i];
                }
            }
            console.log(nwName);
            return nwName;
        };


        this.changeFilter = function (value) {
            console.log("filter called!", value);

            // we need to hide and show objects, based on alphabetical.



            // var filter = {
            //     select: "firstName lastName phoneNumbers",
            //     "startsWith[lastName]": value.value,
            //     "sort[lastName]": 1
            // };
            // this.loadData(filter, true);
        };

        this.__proto__ = tmListFactory(constructorArgs);

        //loadData needs to be async or return a promise.
        this.loadData().then((tmp) => {
            console.log("loadData result:", tmp);

            this.items.map((obj) => {
                obj.nwName = stripNums(obj);
            });
        });

    }

}

tmMenusCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenusCtrl;