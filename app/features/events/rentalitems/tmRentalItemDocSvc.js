import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmRentalItemDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('RentalItem', ninjaSchemas.events.RentalItem);
    
    
    
    return this;
    
}


tmRentalItemDocSvc.$inject = ['tmDocFactory'];

export default tmRentalItemDocSvc;