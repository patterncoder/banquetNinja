import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function userDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('Users', ninjaSchemas.account.User);
    
    
    
    return this;
    
}


userDocSvc.$inject = ['tmDocFactory'];

export default userDocSvc;