import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';
import _ from 'lodash';

function tmContractDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('Contract', ninjaSchemas.events.Contract);
    
    this.saveChanges = function (){
        var self = this;
        var deferred = this.$q.defer();
        // depopulate for saving
        //console.log(_.pick(self.doc.customer, "_id"));
        var stripped = _.pick(self.doc.customer, "_id");
        console.log(stripped);
        self.doc.customer = stripped._id;
        // console.log(self.doc);
        
        var monDoc = new this.tmMongoose.Document(self.doc, self.docSchema);
        monDoc.validate(function(err){
            if(err){
                console.log(err);
                self.validationError = err;
                console.log(self.validationError);
                deferred.reject('has errors');
                return
            }
            self.docModel.update(self.doc).then(function(data){
                self.doc = data;
                self.master = angular.copy(data);
                deferred.resolve();
            });
        });
        return deferred.promise;
    }
    
    
    
    return this;
    
}


tmContractDocSvc.$inject = ['tmDocFactory'];

export default tmContractDocSvc;