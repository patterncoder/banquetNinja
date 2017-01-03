import ninjaSchemas from 'ninjaSchemas';

class tmVenuesCtrl {
    constructor($scope, tmListFactory){
        
        var constructorArgs = {
            schema: ninjaSchemas.events.Venue,
            model: 'Venue',
            listView: 'root.venues',
            detailView: 'root.venueDetail',
            addHeaderText: 'Add Venue',
            listTitle: 'Our Venues'
        };
        
        this.__proto__ = tmListFactory(constructorArgs);
        this.loadData();

        this.sortOptions = [ { value: "name", text: "Sort by Venue" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        this.sortOrder = this.sortOptions[0].value;

        
    }
    
}

tmVenuesCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmVenuesCtrl;

