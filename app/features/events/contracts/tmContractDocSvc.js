import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';
import _ from 'lodash';

function tmContractDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('Contract', ninjaSchemas.events.Contract);
    
    this.addMenuItem = function (menuItem){
        var itemToAdd = {
            name: menuItem.name,
            description: menuItem.description,
            baseId: menuItem._id,
            price: 0,
            quantity: 0
        };
        this.doc.menuItems.push(itemToAdd);
        
        // var index = this.doc.categories.indexOf(category);
        // if (index === -1) {
        //     this.doc.categories.push(category);
        //     return this.doc.categories;
        // } else {
        //     throw new Error("Category already exists");
        // }
    }
    
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