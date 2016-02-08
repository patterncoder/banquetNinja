import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmVenueDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('Venue', ninjaSchemas.events.Venue);
    
    
    
    
    
    return this;
    
}


tmVenueDocSvc.$inject = ['tmDocFactory'];

export default tmVenueDocSvc;