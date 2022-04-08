import ninjaSchemas from 'ninjaSchemas';

class tmStaffMembersCtrl {
    constructor($scope, tmListFactory){
        
        var constructorArgs = {
            schema: ninjaSchemas.events.StaffMember,
            model: 'StaffMember',
            listView: 'root.staffMembers',
            detailView: 'root.staffMembersDetail',
            addHeaderText: 'Add Staff Member',
            listTitle: 'Staff Members'
        };
        
        this.__proto__ = tmListFactory(constructorArgs);
        // this.loadData();
        
        // this.sortOptions = [ { value: "name", text: "Sort by Item" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        // this.sortOrder = this.sortOptions[0].value;

        this.activeFilter = "A";

        this.activeStaff = [];

        let alphaSorted = {"A": [], "B": [], "C": [], "D": [], "E": [], "F": [], "G": [], "H": [], "I": [], "J": [], "K": [], "L": [], "M": [], "N": [], "O": [], "P": [], "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [], "Y": [], "Z": [], "*": []};


        this.stripNums = (staffObj) => {
            let nwName = "";
            if (staffObj.hasOwnProperty("memberName")) {
                let name = staffObj.memberName;
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
            this.activeStaff = alphaSorted[this.activeFilter];

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
                alphaSorted["*"].push(obj);
            });

            this.activeStaff = alphaSorted[this.activeFilter]; //Usually "A".
        };

        //loadData needs to be async or return a promise.
        this.loadData().then((tmp) => {
        });
        
    }
    
}

tmStaffMembersCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmStaffMembersCtrl;

