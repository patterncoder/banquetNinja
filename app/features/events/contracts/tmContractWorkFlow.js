
function tmContractWorkFlow ($dataSource) {
    
    function CreateContract (contractInfo) {
        
        var Contract = $dataSource.load("Contract");
        return Contract.add(contractInfo).then(function(item){
            return item;
        });
        
    }
    
    
    return {
        
    }
    
}

tmContractWorkFlow.$inject = ['$dataSource'];

export default tmContractWorkFlow;