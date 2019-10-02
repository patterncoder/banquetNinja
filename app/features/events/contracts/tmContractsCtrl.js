import ninjaSchemas from 'ninjaSchemas';

class tmContractsCtrl {
    constructor($scope, tmListFactory){
        
        var constructorArgs = {
            schema: ninjaSchemas.events.Contract,
            model: 'Contract',
            listView: 'root.contracts',
            detailView: 'root.contractDetail',
            printView: 'root.contracts.print',
            addHeaderText: 'Add New Bid',
            listTitle: 'Upcoming Contracts'
        };
        
        this.__proto__ = tmListFactory(constructorArgs);
        
        this.loadData({
                "select": "eventName eventDate time customer",
                "where[status]": "booked",
                "populate[customer]": "firstName lastName"
            }, true);
            
        
        this.sortOptions = [ { value: "-eventDate", text: "Sort by Event Date Z-A" }, { value: "eventDate", text: "Sort by Event Date A-Z" }, { value: "eventName", text: "Sort by Event Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

        this.sortOrder = this.sortOptions[0].value;

        this.addContract = function(){
            var self = this;
            var dialogConfig = {
                template: require('apply!./addContract.jade'),
                controller: 'tmAddContractCtrl as vm',
                locals: {model: this.Model,
                        schema: this.constructorArgs.schema,
                        listView: "root.contractsPending",
                        detailView: this.constructorArgs.detailView,
                        headerText: this.constructorArgs.addHeaderText,
                        hideCustomerInput: false,
                        customerId: null}
            };
            self.tmDialogSvc.showDialog(dialogConfig);
        };
        
    } 
    
}

tmContractsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmContractsCtrl;

