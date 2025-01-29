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
        

        this.sortOptions = [ { value: "memberName", text: "Sort by Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        this.sortOrder = this.sortOptions[0].value;


        this.loadData({}, true);


        this.afterAddItemDialogClose = () => {
          this.loadData({}, true);
        };
        
    }
    
}

tmStaffMembersCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmStaffMembersCtrl;

