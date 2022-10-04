import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';
import _ from 'lodash';

function tmContractDocSvc(tmDocFactory, tmIdentity) {

    this.__proto__ = tmDocFactory('Contract', ninjaSchemas.events.Contract);

    function convertDateStrings(data) {
        var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        _.forIn(data, function (value, key) {
            if (typeof value === 'string') {
                var a = reISO.exec(value);
                if (a) {
                    data[key] = new Date(value);
                }
            }
        });
        return data;
    }

    this.addTimeline = function (newTimeEntry) {

        let diff = newTimeEntry.time - newTimeEntry.endTime;

        let diffMinutes = Math.floor((Math.abs(diff) / 1000) / 60);

        newTimeEntry.duration = diffMinutes;

        this.doc.eventSteps.push(newTimeEntry);
    };

    this.getDepositTotal = function () {
        const total = this.docSchema.statics.getDepositTotal(this.doc);
        return total;
    };

    this.getContractTotals = function () {
        const total = this.docSchema.statics.getContractTotals(this.doc);
        return total;
    };

    this.editTimeline = function (timeEntry) {

        let diff = timeEntry.time - timeEntry.endTime;

        let diffMinutes = Math.floor((Math.abs(diff) / 1000) / 60);

        timeEntry.duration = diffMinutes;
    };

    this.removeTimeline = function (index) {
        this.doc.eventSteps.splice(index, 1);
    };

    this.addDeposit = function (newDepositEntry) {
        this.doc.deposits.push(newDepositEntry);
    };

    this.removeDeposit = function (index) {
        this.doc.deposits.splice(index, 1);
    };

    this.addCommLog = (commLog) => {
        this.doc.commLog.push(commLog);
    };

    this.removeCommLog = function (indx) {
        this.doc.commLog.splice(indx, 1);
    };

    this.addVenue = function (venue) {
        var venueToAdd = {
            name: venue.name,
            notes: venue.notes,
            price: venue.price,
            baseId: venue._id
        };
        this.doc.venues.push(venueToAdd);
    };

    this.removeVenue = function (index) {
        this.doc.venues.splice(index, 1);
    };

    this.addMenuItem = function (menuItem) {
        var itemToAdd = {
            printOnHandoutMenu: false,
            name: menuItem.name,
            description: menuItem.description,
            baseId: menuItem._id,
            price: (menuItem.prices && menuItem.prices[0] && menuItem.prices[0].price) || 0,
            quantity: 0
        };
        this.doc.menuItems.push(itemToAdd);
    };

    this.removeMenuItem = function (index) {
        this.doc.menuItems.splice(index, 1);
    };

    this.deleteMenuItem = function (itemIndex) {
        // var idx = this.doc.menuItems.indexOf(item);
        if (itemIndex >= 0) {
            this.doc.menuItems.splice(itemIndex, 1);
        }
    };

    this.deleteAdditionalContact = function (index) {
        this.doc.additionalContacts.splice(index, 1);
    }

    this.additionalContactTemplate = function () {
        this.doc.additionalContacts.push({
            firstName: '',
            lastName: '',
            email: '',
            cellPhone: '',
            homePhone: '',
            relationToCustomer: '',
            aNumber: 4
        });
        return;
    }

    this.addRentalItem = function (rentalItem) {
        let itemToAdd = {
            name: rentalItem.name,
            quantity: 0,
            price: 0
        }
        if (this.doc.rentalItems == undefined) {
            this.doc.rentalItems = []; //object wasn't properly initialized...
        }
        this.doc.rentalItems.push(itemToAdd);
    };

    this.removeRentalItem = function (index) {
        this.doc.rentalItems.splice(index, 1);
    };

    this.addStaffMember = (staffMember) => {
        if (this.doc.assignedStaff == undefined) {
            this.doc.assignedStaff = [];
        }
        this.doc.assignedStaff.push(staffMember);
    };

    this.removeStaffMember = (index) => {
        this.doc.staffMembers.splice(index, 1);
    };


    this.saveChanges = function () {
        var self = this;
        var deferred = this.$q.defer();


        //now that we are saving as unix epoch, we won't need historical time stamps.
        if (self.doc.hasOwnProperty("startTime24") && self.doc.hasOwnProperty("endTime24") && self.doc.hrMinFix) {
            self.doc.startTime24 = "0";
            self.doc.endTime24 = "0";
        }

        if (self.doc.hasOwnProperty("serviceType")) {
            let serviceTypeOptions = this.docSchema.paths.serviceType.enumValues;
            if (self.doc.serviceType) {
                let indx = serviceTypeOptions.indexOf(self.doc.serviceType);
                if (indx < 0) {
                    self.doc.serviceType = undefined;
                }
            }
        }

        this.taxRate = this.taxRate || .0875;

        //  depopulate for saving
        var customerMemo = self.doc.customer;
        var stripped = _.pick(self.doc.customer, "_id");
        self.doc.customer = stripped._id;
        var monDoc = new this.tmMongoose.Document(self.doc, self.docSchema);
        monDoc.validate(function (err) {
            if (err) {
                self.doc.customer = customerMemo;
                self.validationError = err;
                deferred.reject({
                    msg: 'contract doc service has errors',
                    err: err
                });
                return;
            }
            self.docModel.update(self.doc).then(function (data) {
                data = convertDateStrings(data);
                self.doc = data;
                self.master = angular.copy(data);
                deferred.resolve();
            });
        });
        return deferred.promise;
    };



    return this;

}


tmContractDocSvc.$inject = ['tmDocFactory', 'tmIdentity'];

export default tmContractDocSvc;