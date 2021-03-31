
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
            let nwName = "";
            if (menuObj.hasOwnProperty("name")) {
                let name = menuObj.name;
                for (let i = 0; i < name.length; ++i) {
                    if (isNaN(name[i])) {
                        nwName += name[i];
                    }
                }
                console.log(nwName);
            } else {
                console.log("NO NAME PROPERTY!!!", menuObj);
            }
            return nwName;
        };

        let getFilterChar = (nwName) => {
            let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            let str = nwName.toUpperCase();
            let char = str[0];
            if (alphabet.indexOf(char) > -1) {
                return char;
            }

            return "A";
        };


        this.changeFilter = function (value) {
            console.log("filter called!", value);
            this.filter = value;

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

            this.items.reverse() //comes in from db oldest first...

            this.items.map((obj) => {
                obj.nwName = stripNums(obj);
                obj.filterChar = getFilterChar(obj.nwName);
                console.log("filterChar:", obj.filterChar);
            });
        });

    }

}

tmMenusCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenusCtrl;