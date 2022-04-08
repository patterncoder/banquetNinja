import ninjaSchemas from 'ninjaSchemas';

class tmMenuGroupsCtrl {
    constructor($scope, tmListFactory){
        
        var constructorArgs = {
            schema: ninjaSchemas.production.MenuGroup,
            model: 'MenuGroup',
            listView: 'root.menugroups',
            detailView: 'root.menuGroupDetail',
            addHeaderText: 'Add Menu Group',
            listTitle: 'Menu Groups'
        };
        
        this.__proto__ = tmListFactory(constructorArgs);

        // this.loadData();
        
        // this.sortOptions = [ { value: "name", text: "Sort by Item" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        // this.sortOrder = this.sortOptions[0].value;

        this.activeFilter = "A";

        this.activeGroups = [];

        let alphaSorted = {"A": [], "B": [], "C": [], "D": [], "E": [], "F": [], "G": [], "H": [], "I": [], "J": [], "K": [], "L": [], "M": [], "N": [], "O": [], "P": [], "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [], "Y": [], "Z": [], "*": []};

        this.stripNums = (menuObj) => {
            let nwName = "";
            if (menuObj.hasOwnProperty("name")) {
                let name = menuObj.name;
                for (let i = 0; i < name.length; ++i) {
                    if (isNaN(name[i])) {
                        nwName += name[i];
                    }
                }
            } else {
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
            this.activeGroups = alphaSorted[this.activeFilter];

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
                alphaSorted["*"].push(obj); //store all in this one
            });

            this.activeGroups = alphaSorted[this.activeFilter]; //Usually "A".
        };


        this.loadData();
        
    }
    
}

tmMenuGroupsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenuGroupsCtrl;

