
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

        this.__proto__ = tmListFactory(constructorArgs);
        var self = this;

        this.sortOptions = [{ value: "name", text: "Sort by Name A-Z" }, { value: "-name", text: "Sort by Name Z-A" }];
        this.sortOrder = this.sortOptions[1].value;

        // this.activeFilter = "A";

        // this.activeMenus = [];

        // let alphaSorted = { "A": [], "B": [], "C": [], "D": [], "E": [], "F": [], "G": [], "H": [], "I": [], "J": [], "K": [], "L": [], "M": [], "N": [], "O": [], "P": [], "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [], "Y": [], "Z": [] };


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
        //     }                // if(self.hasOwnProperty("activateAndSort")) {
        //         //     self.activateAndSort();
        //         // }

        //     return "A";
        // };


        // this.changeFilter = function (value) {
        //     //refresh the list, in case a new item was added.
        //     alphaSorted = { "A": [], "B": [], "C": [], "D": [], "E": [], "F": [], "G": [], "H": [], "I": [], "J": [], "K": [], "L": [], "M": [], "N": [], "O": [], "P": [], "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [], "Y": [], "Z": [] };
        //     this.activateAndSort();

        //     this.activeFilter = value.value;
        //     this.activeMenus = alphaSorted[this.activeFilter];

        // };

        // this.activateAndSort = () => {


        //     this.items.map((obj) => {
        //         obj.nwName = this.stripNums(obj);
        //         obj.filterChar = this.getFilterChar(obj.nwName);
        //         alphaSorted[obj.filterChar].push(obj);
        //     });

        //     this.activeMenus = alphaSorted[this.activeFilter]; //Usually "A".
        // }

        // this.reload = () => {
        //     this.loadData().then((tmp) => {
        //         this.activateAndSort();
        //     });
        // };

        // this.afterLoad = () => {
        //     //this.items.reverse() //comes in from db oldest first...
        //     this.activateAndSort();
        // };

        //loadData needs to be async or return a promise.
        this.loadData({
            select: "name title",
            "sort[name]": 2
        }).then(function (data) {});

    }

}

tmMenusCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenusCtrl;