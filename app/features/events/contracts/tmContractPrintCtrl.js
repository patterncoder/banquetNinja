function tmContractPrintCtrl ($dataSource, $state, $window) {
    var $ctrl = this;
    
    function init(){
        
        var Contract = $dataSource.load('Contract');
        var contractId = $state.params.id;
        Contract.getOne(contractId).then(function(data){
            calculateTotals(data);
            $ctrl.doc = data;
        });
    };
    
    function add(a, b) {
        return (a + b);
    }
    function multiply(a, b) {
        return (a * b);
    }
    function calculateTotals(contract){
        var taxRate = 0.08;
        var gratuityRate = 0.2;
        $ctrl.totals = {
            "Food Total" : 0.00,
            "Rental Total" : 0.00,
            "Tax" : 0.00,
            "20% Gratuity" : 0.00,
            "Sub Total" : 0.00,
            "Discount" : 0.00,
            "Total" : 0.00,
            "Deposit" : 0.00,
            "Total Due" : 0.00
        };
        $ctrl.totals['Food Total'] = 0.00;
        $ctrl.totals['Rental Total'] = 0.00;

        // food total
        if (contract.menuItems.length > 0) {
            $ctrl.totals['Food Total'] = contract.menuItems.map(function(food) {
                return multiply(food.quantity,food.price)
            }).reduce(add,0);
        } 

        // rental total
        if (contract.rentalItems.length > 0) {
            $ctrl.totals['Rental Total'] = contract.rentalItems.map(function(item) {
                return item.price;
            }).reduce(add,0);
        }         

        // tax
        $ctrl.totals['Tax'] = ($ctrl.totals['Food Total'] + $ctrl.totals['Rental Total']) * taxRate;  

        // 20% Gratuity
        $ctrl.totals['20% Gratuity'] = ($ctrl.totals['Food Total'] + $ctrl.totals['Rental Total']) * gratuityRate; 

        // subtotal
        $ctrl.totals['Sub Total'] =  ($ctrl.totals['Food Total'] + $ctrl.totals['Rental Total'] + $ctrl.totals['Tax']+ $ctrl.totals['20% Gratuity']);

        // discount (HOW SHOULD THIS BE HANDLED does this need to be added to schema)
        $ctrl.totals['Discount'] = 0.00;
        
        // total
        $ctrl.totals['Total'] = $ctrl.totals['Discount'] + $ctrl.totals['Sub Total'];

        // deposit(HOW SHOULD THIS BE HANDLED does this need to be added to schema)
        $ctrl.totals['Deposit'] = 0.00;        

        // total due
        $ctrl.totals['Total Due'] =  $ctrl.totals['Total'] - $ctrl.totals['Deposit'];
    }

    $ctrl.back = function(){
        $state.go($state.back.fromState.name, $state.back.fromParams);
    };
    
    $ctrl.print = function(){
        $window.print();
    };
    
    init();

    
}

tmContractPrintCtrl.$inject = ['$dataSource', '$state', '$window'];

export default tmContractPrintCtrl;