import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmMenuDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('MenuGroup', ninjaSchemas.production.MenuGroup);
    
    
    
    
    
    return this;
    
}


tmMenuDocSvc.$inject = ['tmDocFactory'];

export default tmMenuDocSvc;