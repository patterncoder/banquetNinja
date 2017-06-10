import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmUserDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('Users', ninjaSchemas.account.User);
    
    this.addRole = function (role) {
        this.doc.roles.push(role)
    };
    this.updateRole = function (oldRole, newRole) {
        var idx = this.doc.roles.indexOf(oldRole);
        if (idx >= 0) {
            this.doc.roles[idx] = newRole;
        }
    };
    this.removeRole = function (role) {
        var idx = this.doc.roles.indexOf(role);
        if (idx >= 0) {
            this.doc.roles.splice(idx, 1);
        }
    };
    
    return this;
    
}


tmUserDocSvc.$inject = ['tmDocFactory'];

export default tmUserDocSvc;