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
    
    this.saveChanges = function () {
        var self = this;
        var deferred = this.$q.defer();
        // depopulate for saving
        var stripped = _.pick(self.doc, "_id");
        self.doc.user = stripped._id;

        var monDoc = new this.tmMongoose.Document(self.doc, self.docSchema);
        monDoc.validate(function (err) {
            if (err) {
                console.log(err);
                self.validationError = err;
                console.log(self.validationError);
                deferred.reject('user doc service has errors');
                return;
            }
            self.docModel.update(self.doc).then(function (data) {
                self.doc = data;
                self.master = angular.copy(data);
                deferred.resolve();                
            });
        });
        return deferred.promise;
    };
    
    return this;
    
}


tmUserDocSvc.$inject = ['tmDocFactory'];

export default tmUserDocSvc;