import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmContractDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('Contract', ninjaSchemas.events.Contract);
    
    
    
    
    
    return this;
    
}


tmContractDocSvc.$inject = ['tmDocFactory'];

export default tmContractDocSvc;