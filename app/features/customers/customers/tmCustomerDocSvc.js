import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmMenuDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('Customer', ninjaSchemas.customer.Customer);
    
    
    
    
    
    return this;
    
}


tmMenuDocSvc.$inject = ['tmDocFactory'];

export default tmMenuDocSvc;