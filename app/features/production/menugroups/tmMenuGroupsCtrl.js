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

        // this.loadData();

        // this.sortOptions = [ { value: "name", text: "Sort by Item" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        // this.sortOrder = this.sortOptions[0].value;

        this.activatedGroup = undefined;

        this.activeFilter = "A";

        this.activeGroups = [];

        const sortTemplate = { "A": [], "B": [], "C": [], "D": [], "E": [], "F": [], "G": [], "H": [], "I": [], "J": [], "K": [], "L": [], "M": [], "N": [], "O": [], "P": [], "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [], "Y": [], "Z": [], "*": [] };

        let alphaSorted = sortTemplate;

        console.log("tmMenuGroupsCtrl this:", this);

        this.setActive = (item) => {
            // console.log("clicked!", item);
            // console.log("this", this);
            let req = {
                method: "PUT",
                url: `${config.apiBase}/production/menugroups/active/${item["_id"]}`
            };

            this.$http(req).then((response) => {
                if (response.status == 200) {
                    this.items.map((obj) => {
                        if (obj.hasOwnProperty("active") && obj["_id"] != item["_id"]) {
                            if (obj.active) {
                                obj.active = false;
                            }
                        }
                    });
                }
            });
        };

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

        this.loadSort = () => {

            alphaSorted = sortTemplate;

            this.items.map((obj) => {
                // if (obj.hasOwnProperty("active")) {
                //     if (obj.active) {
                //         this.activatedGroup = obj;
                //     }
                // }
                obj.nwName = this.stripNums(obj);
                obj.filterChar = this.getFilterChar(obj.nwName);
                alphaSorted[obj.filterChar].push(obj);
                alphaSorted["*"].push(obj); //store all in this one
            });

            this.activeGroups = [];

            this.activeGroups = alphaSorted[this.activeFilter]; //Usually "A".
        };

        this.afterLoad = () => {
            //this.items.reverse() //comes in from db oldest first...

            if (this.items.length < 25) {
                this.activeFilter = "*";
            }

            this.loadSort();

        };


        this.loadData(undefined, true);

    }

}

tmMenuGroupsCtrl.$inject = ['$scope', 'tmListFactory', '$http', '$dataSource'];

export default tmMenuGroupsCtrl;

