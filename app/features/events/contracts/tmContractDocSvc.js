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

    // this.foodOptions = [{
    //     title: "Add Food",
    //     func: () => { console.log("click on add food"); console.log(this)}
    // }, {
    //     title: "Add Blank",
    //     func: () => { console.log("clicked on add blank")}
    // }];

    this.addTimeline = function (newTimeEntry) {

        let diff = newTimeEntry.time - newTimeEntry.endTime;

        let diffMinutes = Math.floor((Math.abs(diff) / 1000) / 60);

        newTimeEntry.duration = diffMinutes;

        this.doc.eventSteps.push(newTimeEntry);
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
            price: 0,
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
        if(self.doc.hasOwnProperty("startTime24") && self.doc.hasOwnProperty("endTime24") && self.doc.hrMinFix) {
            self.doc.startTime24 = "0";
            self.doc.endTime24 = "0";
        }

        //  depopulate for saving
        var stripped = _.pick(self.doc.customer, "_id");
        self.doc.customer = stripped._id;
        var monDoc = new this.tmMongoose.Document(self.doc, self.docSchema);
        monDoc.validate(function (err) {
            if (err) {
                console.log(err);
                self.validationError = err;
                console.log(self.validationError);
                deferred.reject('contract doc service has errors');
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