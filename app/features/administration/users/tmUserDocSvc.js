import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmUserDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('Users', ninjaSchemas.account.User);
    
    this.addRole = function (role) {
        this.doc.roles.push(role)
        console.log(`addRoles adds ${this.doc.roles}`);
    };
    this.updateRole = function (oldRole, newRole) {
        var idx = this.doc.roles.indexOf(oldRole);
        if (idx >= 0) {
            this.doc.roles[idx] = newRole;
        }
    };
    this.removeRole = function (idx) {
        this.doc.roles.splice(idx, 1);
        console.log(`removeRole set arr to ${this.doc.roles}`);
    };
    
    return this;
    
}


tmUserDocSvc.$inject = ['tmDocFactory'];

export default tmUserDocSvc;