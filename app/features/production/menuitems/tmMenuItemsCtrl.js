import ninjaSchemas from 'ninjaSchemas';
class tmMenuItemsCtrl {
    constructor($scope, tmListFactory) {
        var constructorArgs = {
            schema: ninjaSchemas.production.MenuItem,
            model: 'MenuItem',
            listView: 'root.menuitems',
            detailView: 'root.menuItemDetail',
            addHeaderText: 'Add Menu Item',
            listTitle: 'Menu Items'
        };

        this.__proto__ = tmListFactory(constructorArgs);
        // this.loadData();

        this.sortOptions = [ { value: "name", text: "Sort by Item" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        this.sortOrder = this.sortOptions[0].value;


        
        this.changeFilter = function (value) {
            var filter = {
                select: "name title description active",
                "sort[name]": 1,
                "startsWith[name]": value.value,
            };
            this.loadData(filter, true, true);
        };

        // this.activeFilter = "A";

        // this.activeMenuItems = [];

        // let alphaSorted = { "A": [], "B": [], "C": [], "D": [], "E": [], "F": [], "G": [], "H": [], "I": [], "J": [], "K": [], "L": [], "M": [], "N": [], "O": [], "P": [], "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [], "Y": [], "Z": [], "*": [] };

        // this.stripNums = (menuObj) => {
        //     let nwName = "";
        //     if (menuObj.hasOwnProperty("name")) {
        //         let name = menuObj.name;
        //         for (let i = 0; i < name.length; ++i) {
        //             if (isNaN(name[i])) {
        //                 nwName += name[i];
        //             }
        //         }
        //     } else {
        //     }
        //     return nwName;
        // };

        // this.getFilterChar = (nwName) => {
        //     let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        //     let str = nwName.toUpperCase();
        //     let char = str[0];
        //     if (alphabet.indexOf(char) > -1) {
        //         return char;
        //     }

        //     return "A";
        // };


        

        this.loadData({
            select: "name title description active",
            "sort[name]": 1,
            "startsWith[name]": "A",
        }, true, true);
    }
}

tmMenuItemsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenuItemsCtrl;