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
        this.loadData();
        
    }
    
}

tmContractsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmContractsCtrl;

