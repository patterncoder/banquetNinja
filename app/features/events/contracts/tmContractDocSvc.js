import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';
import _ from 'lodash';

function tmContractDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('Contract', ninjaSchemas.events.Contract);
    
    function convertDateStrings(data){
        var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        _.forIn(data, function(value, key) {
                //console.log(key);
                if (typeof value === 'string') {
                    var a = reISO.exec(value);
                    if (a) {
                        data[key] = new Date(value);
                    }
                }
            });
        return data;
    }

    this.addVenue = function (venue) {
        var venueToAdd = {
            name: venue.name,
            notes: "",
            baseId: venue._id
        };
        this.doc.venue.push(venueToAdd);
    };

    this.removeVenue = function(index){
        this.doc.venue.splice(index, 1);
    };
    
    this.addMenuItem = function (menuItem){
        var itemToAdd = {
            name: menuItem.name,
            description: menuItem.description,
            baseId: menuItem._id,
            price: 0,
            quantity: 0
        };
        this.doc.menuItems.push(itemToAdd);
    }
    
    this.removeMenuItem = function(index){
        this.doc.menuItems.splice(index, 1);
    };
    
    this.deleteMenuItem = function(item){
        // console.log({item: item});
        // console.log({doc: this.doc});
        // console.log({menuItems: this.doc.menuItems})
        var idx = this.doc.menuItems.indexOf(item);
        if (idx >= 0) {
            this.doc.menuItems.splice(idx, 1);
        }
    };
    
    this.saveChanges = function (){
        var self = this;
        var deferred = this.$q.defer();
        // depopulate for saving
        //console.log(_.pick(self.doc.customer, "_id"));
        var stripped = _.pick(self.doc.customer, "_id");
        //console.log(stripped);
        self.doc.customer = stripped._id;
        // console.log(self.doc);
        
        var monDoc = new this.tmMongoose.Document(self.doc, self.docSchema);
        monDoc.validate(function(err){
            if(err){
                console.log(err);
                self.validationError = err;
                console.log(self.validationError);
                deferred.reject('contract doc service has errors');
                return
            }
            self.docModel.update(self.doc).then(function(data){
                data = convertDateStrings(data);
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