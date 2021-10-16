import ninjaSchemas from 'ninjaSchemas';

class tmRentalItemsCtrl {
    constructor($scope, tmListFactory){
        
        var constructorArgs = {
            schema: ninjaSchemas.events.RentalItem,
            model: 'RentalItem',
            listView: 'root.rentalitems',
            detailView: 'root.rentalitemDetail',
            addHeaderText: 'Add Rental Item',
            listTitle: 'Rental Items'
        };
        
        this.__proto__ = tmListFactory(constructorArgs);
        // this.loadData();
        
        // this.sortOptions = [ { value: "name", text: "Sort by Item" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        // this.sortOrder = this.sortOptions[0].value;

        this.activeFilter = "A";

        this.activeRentals = [];

        let alphaSorted = {"A": [], "B": [], "C": [], "D": [], "E": [], "F": [], "G": [], "H": [], "I": [], "J": [], "K": [], "L": [], "M": [], "N": [], "O": [], "P": [], "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [], "Y": [], "Z": [], "*": []};

        console.log("tmRentalItemsCtrl this:", this);

        this.stripNums = (rentObj) => {
            let nwName = "";
            if (rentObj.hasOwnProperty("name")) {
                let name = rentObj.name;
                for (let i = 0; i < name.length; ++i) {
                    if (isNaN(name[i])) {
                        nwName += name[i];
                    }
                }
                console.log(nwName);
            } else {
                console.log("NO NAME PROPERTY!!!", rentObj);
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
            this.activeRentals = alphaSorted[this.activeFilter];

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

            this.activeRentals = alphaSorted[this.activeFilter]; //Usually "A".
        };

        //loadData needs to be async or return a promise.
        this.loadData().then((tmp) => {
            console.log("loadData result:", tmp);
        });
        
    }
    
}

tmRentalItemsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmRentalItemsCtrl;

