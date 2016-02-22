import ninjaSchemas from 'ninjaSchemas';

class tmContractsCtrl {
    constructor($scope, tmListFactory){
        
        var constructorArgs = {
            schema: ninjaSchemas.events.Contract,
            model: 'Contract',
            listView: 'root.contracts',
            detailView: 'root.contractDetail',
            addHeaderText: 'Add Contract',
            listTitle: 'Upcoming Contracts'
        };
        
        this.__proto__ = tmListFactory(constructorArgs);
        
        this.loadData({sel: 'eventName eventDate startTime'});
        //this.loadData();
        
        
        this.addContract = function(){
            var self = this;
            var dialogConfig = {
                template: require('apply!./addContract.jade'),
                controller: 'tmAddContractCtrl as vm',
                locals: {model: this.Model,
                        schema: this.constructorArgs.schema,
                        listView: this.constructorArgs.listView,
                        detailView: this.constructorArgs.detailView,
                        headerText: this.constructorArgs.addHeaderText}
            };
            self.tmDialogSvc.showDialog(dialogConfig);
        }
        
    }
    
}

tmContractsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmContractsCtrl;

