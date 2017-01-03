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
        this.loadData();
        
        this.sortOptions = [ { value: "name", text: "Sort by Item" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        this.sortOrder = this.sortOptions[0].value;

        
    }
    
}

tmRentalItemsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmRentalItemsCtrl;

