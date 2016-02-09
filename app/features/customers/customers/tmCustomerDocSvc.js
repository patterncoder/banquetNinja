import ninjaSchemas from 'ninjaSchemas';

import angular from 'angular';

function tmMenuDocSvc (tmDocFactory) {
    var self = this;
    self.__proto__ = tmDocFactory('Customer', ninjaSchemas.customer.Customer);
    self.addressError = null;
    
    self.addAddress = function (address) {
        self.doc.addresses.push(address);
    };
    
    self.updateAddress = function (index, address) {
        // console.log('in updateAddres');
        // self.doc.addresses.splice(index, 1);
        // self.doc.addresses.push(address);
        self.doc.addresses[index] = address;
    }
    
    self.removeAddress = function (index) {
        self.doc.addresses.splice(index, 1);
    }
    
    self.addPhoneNumber = function(phoneNumber){
        self.doc.phoneNumbers.push(phoneNumber)
    };
    
    self.updatePhoneNumber = function (index, phoneNumber) {
        self.doc.phoneNumbers[index] = phoneNumber;
    }
    
    self.removePhoneNumber = function (index) {
        self.doc.phoneNumbers.splice(index, 1);
    }
    
    self.addEmail = function(email){
        self.doc.emails.push(email)
    };
    
    self.updateEmail = function (index, email) {
        self.doc.emails[index] = email;
    }
    
    self.removeEmail = function (index) {
        self.doc.emails.splice(index, 1);
    }
    
    self.addContract = function(contract) {
        self.doc.contracts.push(contract);
    }
    
    
    return this;
    
}


tmMenuDocSvc.$inject = ['tmDocFactory'];

export default tmMenuDocSvc;