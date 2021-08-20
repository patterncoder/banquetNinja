import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmSettingsDocSvc(tmDocFactory) {

    this.__proto__ = tmDocFactory('Company', ninjaSchemas.account.Company);


    this.deleteEmail = (input) => {
        console.log("deleteEmail called!", input);
    };

    this.deleteAddress = (input) => {
        console.log("deleteEmail called!", input);
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


tmSettingsDocSvc.$inject = ['tmDocFactory'];

export default tmSettingsDocSvc;