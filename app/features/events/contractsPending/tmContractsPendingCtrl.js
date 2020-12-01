import ninjaSchemas from 'ninjaSchemas';

class tmContractsPendingCtrl {
    constructor($scope, tmListFactory){
        
        var constructorArgs = {
            schema: ninjaSchemas.events.Contract,
            model: 'BookedContract',
            listView: 'root.contractsPending',
            detailView: 'root.contractDetail',
            printView: 'root.contracts.print',
            addHeaderText: 'Add New Bid',
            listTitle: 'Event Bids'
        };
        
        this.__proto__ = tmListFactory(constructorArgs);
        
      //http://localhost:3001/api/v1/events/contracts?where[status]=pending

        this.loadData({select: 'eventName eventDate startTime customer',
                         'where[status]': 'pending',
                         "populate[customer]": "firstName lastName"
                        }, true);
      // this.loadData({sel: 'eventName eventDate startTime', 'where[status]': 'pending'}); 
        //this.loadData();
        
        this.sortOptions = [ { value: "-eventDate", text: "Sort by Event Date Z-A" }, { value: "eventDate", text: "Sort by Event Date A-Z" }, { value: "eventName", text: "Sort by Event Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        this.sortOrder = this.sortOptions[0].value;

        this.addContract = function(){
            var self = this;
            var dialogConfig = {
                template: require('apply!../contracts/addContract.jade'),
                controller: 'tmAddContractCtrl as vm',
                locals: {model: this.Model,
                        schema: this.constructorArgs.schema,
                        listView: this.constructorArgs.listView,
                        detailView: this.constructorArgs.detailView,
                        headerText: this.constructorArgs.addHeaderText,
                        hideCustomerInput: false,
                        customerId: null}
            };
            console.log("hello");
            self.tmDialogSvc.showDialog(dialogConfig);
        };
        
    } 
    
}

tmContractsPendingCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmContractsPendingCtrl;


