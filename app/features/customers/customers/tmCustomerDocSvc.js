import ninjaSchemas from 'ninjaSchemas';
import _ from 'lodash';
import angular from 'angular';

function tmMenuDocSvc (tmDocFactory) {
    var self = this;
    self.__proto__ = tmDocFactory('Customer', ninjaSchemas.customer.Customer);
    self.addressError = null;
    
    this.saveChanges = function (){
        var self = this;
        var deferred = this.$q.defer();
        var contractIds = _.pluck(self.doc.contracts, "_id");
        self.doc.contracts = contractIds;
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
    };
    
    self.addAddress = function (address) {
        self.doc.addresses.push(address);
    };
    
    self.updateAddress = function (index, address) {
        // console.log('in updateAddres');
        // self.doc.addresses.splice(index, 1);
        // self.doc.addresses.push(address);
        self.doc.addresses[index] = address;
    };
    
    self.removeAddress = function (index) {
        self.doc.addresses.splice(index, 1);
    };
    
    self.addPhoneNumber = function(phoneNumber){
        console.log(phoneNumber);
        phoneNumber.number = phoneNumber.number.replace(/[^0-9]/g, '');
        //console.log(strippedNumber);
        self.doc.phoneNumbers.push(phoneNumber)
    };
    
    self.updatePhoneNumber = function (index, phoneNumber) {
        self.doc.phoneNumbers[index] = phoneNumber;
    };
    
    self.removePhoneNumber = function (index) {
        self.doc.phoneNumbers.splice(index, 1);
    };
    
    self.addEmail = function(email){
        self.doc.emails.push(email);
    };
    
    self.updateEmail = function (index, email) {
        self.doc.emails[index] = email;
    };
    
    self.removeEmail = function (index) {
        self.doc.emails.splice(index, 1);
    };
    
    self.addContract = function(contract) {
        //self.doc.contracts.push(contract);
    };
    
    
    
    
    return this;
    
}


tmMenuDocSvc.$inject = ['tmDocFactory'];

export default tmMenuDocSvc;