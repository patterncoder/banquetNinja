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
        // this.loadData();
        
        // this.sortOptions = [ { value: "name", text: "Sort by Item" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        // this.sortOrder = this.sortOptions[0].value;

        this.activeFilter = "A";

        this.activeMenuItems = [];

        let alphaSorted = {"A": [], "B": [], "C": [], "D": [], "E": [], "F": [], "G": [], "H": [], "I": [], "J": [], "K": [], "L": [], "M": [], "N": [], "O": [], "P": [], "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [], "Y": [], "Z": [], "*": []};

        console.log("tmMenuItemsCtrl this:", this);

        this.stripNums = (menuObj) => {
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

        this.getFilterChar = (nwName) => {
            let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            let str = nwName.toUpperCase();
            let char = str[0];
            if (alphabet.indexOf(char) > -1) {
                return char;
            }

            return "A";
        };


        this.changeFilter = function (value) {
            this.activeFilter = value.value;
            this.activeMenuItems = alphaSorted[this.activeFilter];

        };

        this.afterLoad = () => {
            //this.items.reverse() //comes in from db oldest first...

            if(this.items.length < 25) {
                this.activeFilter = "*";
            }

            this.items.map((obj) => {
                obj.nwName = this.stripNums(obj);
                obj.filterChar = this.getFilterChar(obj.nwName);
                alphaSorted[obj.filterChar].push(obj);
                alphaSorted["*"].push(obj); //collect all into this one.
            });

            this.activeMenuItems = alphaSorted[this.activeFilter]; //Usually "A".
        };

        this.loadData();
    }
}

tmMenuItemsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenuItemsCtrl;