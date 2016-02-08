import ninjaSchemas from 'ninjaSchemas';

class tmMenuGroupsCtrl {
    constructor($scope, tmListFactory){
        
        var constructorArgs = {
            schema: ninjaSchemas.customer.Customer,
            model: 'Customer',
            listView: 'root.customers',
            detailView: 'root.customerDetail',
            addHeaderText: 'Add Customer',
            listTitle: 'Our Customers'
        };
        
        this.sortOptions = [{ value: "lastName", text: "Sort by Last Name" }, { value: "firstName", text: "Sort by First Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];
        this.__proto__ = tmListFactory(constructorArgs);
        this.loadData();
        
    }
    
}

tmMenuGroupsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenuGroupsCtrl;

