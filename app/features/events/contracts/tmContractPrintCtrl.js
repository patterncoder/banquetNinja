
function tmContractPrintCtrl ($dataSource, $state, $window) {
    var $ctrl = this;
    
    function init(){
        
        var Contract = $dataSource.load('Contract');
        var contractId = $state.params.id;
        Contract.getOne(contractId).then(function(data){
            $ctrl.doc = data;
        });
    };

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