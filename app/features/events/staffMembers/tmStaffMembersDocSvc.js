import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmStaffMembersDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('StaffMember', ninjaSchemas.events.StaffMember);
    
    
    
    return this;
    
}


tmStaffMembersDocSvc.$inject = ['tmDocFactory'];

export default tmStaffMembersDocSvc;