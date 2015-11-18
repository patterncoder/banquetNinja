var Q = require('q');
var encrypt = require('../utilities/encryption');
var User = require('mongoose').model('User');
var Company = require('mongoose').model('Company');

exports.createDefaultCompany = createDefaultCompany;
exports.createDefaultUsers = createDefaultUsers;

function createDefaultCompany() {
    var deferred = Q.defer();
    
    Company.find({}).exec(function (err, collection) {
        if (collection.length === 0) {

            var company1 = {
                companyName: "Old Town Dining, LLC",
                addresses: [{
                    addressType: "headquarters",
                    primary: true,
                    address1: "28699 Old Town Front Street",
                    city: "Temecula",
                    state: "CA",
                    zip: "92592"
                }],
                emails: [{
                    emailType: "accountAdmin",
                    primary: true,
                    email: "chris@oldtowndining.com"
                }],
                contactNumbers: [{ primary: true, contactType: "admin", number: "9516769567" }],
                duesCurrent: true,
                accountLockout: false,
                accountState: 'awaitingFirstPayment'
            };
            
            Company.create(company1, function (err, company) {
                if (err) {
                    console.log('i have an error');
                    console.log(err);
                    deferred.reject(new Error(err));
                } else {
                    
                    console.log('10 successfully created company document....');
                    deferred.resolve(company._id);
                    
                }
            });
            
            
        }

    });
    
    return deferred.promise;
}



function createDefaultUsers(companyId) {
    
    function encryptPassword(user) {
        var salt, hash;
        salt = encrypt.createSalt();
        hash = encrypt.hashPwd(salt, user.firstName.toLowerCase());
        user.hashed_pwd = hash;
        user.salt = salt;
        return user;
    }
    
    var deferred = Q.defer();
    
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var user1 = encryptPassword({company: companyId, firstName: "nolan", lastName: "james", username: "nolan@nolan.com", roles: ['Bronze'] });
            var user2 = encryptPassword({ company: companyId, firstName: "chris", lastName: "baily", username: "chris@chris.com", roles: ['admin', 'superUser'] });
            var user3 = encryptPassword({company: companyId, firstName: "kim", lastName: "rose", username: "kim@kim.com", roles: ['admin']});
            var user4 = encryptPassword({ company: companyId, firstName: "alex", lastName: "phillips", username: "alex@alex.com", roles: ['Silver'] });
            var user5 = encryptPassword({company: companyId, firstName: "hayley", lastName: "briana", username: "hayley@hayley.com", roles: ['Gold'] });
            
            User.create(user1, user2, user3, user4, user5, function (err, user1, user2, user3, user4, user5){
                if (err) {
                    deferred.reject(new Error(err));
                }
                
                console.log('20 succesfully created user documents.....');
                deferred.resolve();
                
            });
            

        }

    });
    return deferred.promise;

}

