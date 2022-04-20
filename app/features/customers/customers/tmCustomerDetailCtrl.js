import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';
import config from 'config';

function tmCustomerDetailCtrl(
    $scope,
    tmDetailFactory,
    tmCustomerDocSvc,
    $dataSource,
    $http
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmCustomerDocSvc,
        schema: ninjaSchemas.customer.Customer,
        model: "Customer",
        listView: "root.customers",
        detailView: "root.customerDetail",
        addHeaderText: "Add Customer"
    };

    this.__proto__ = tmDetailFactory(constructorArgs);

    // this.moreFunctions.push({label: "test", method: function(){console.log('whatsup');}});

    this.dialogOptions = {
        closeButtonText: 'No',
        actionButtonText: 'Yes',
        headerText: 'Wait!',
        bodyText: 'Delete this item?'
    };


    this.loadData().then(function () {
        // running code here happens after the detail doc has been loaded
        self.getDetailTitle();
        self.getRelatedContracts();
    });

    // @HowTo: go from one detail screen to another
    this.goToContract = function (contract) {
        this.canILeave().then(function(iCanLeave) {
            if (iCanLeave) {
                self.docSvc.clearDocument();
                self.$state.data = 'root.contractDetail';
                self.$state.go('root.contractDetail', {id: contract._id});
            }
        });
    }

    this.getRelatedContracts = function () {
        let custID = this.docSvc.doc["_id"];

        var req = {
            method: 'GET',
            url: `${config.apiBase}/events/contracts/customer/${custID}`,
            // params: {
            //     customer: custID
            // }
        };

        this.$http(req).then((response) => {
            if (this.contractsList == undefined) {
                this.contractsList = [];
            }


            this.contractsList = response.data.data;
        });
    }

    this.$scope.$watch(function () {
        return self.docSvc.isDirty();
    }, function (newVal, oldVal, scope) {
        if (newVal) {
            self.detailForm.$setDirty();
        } else {
            self.detailForm.$setPristine();
            self.detailForm.$setUntouched();
        }
    });

    this.getDetailTitle = function () {
        self.detailTitle = {
            leader: 'Customer Detail: ',
            text: self.docSvc.doc.lastName + ', ' + self.docSvc.doc.firstName
        };
        this.$scope.$watchGroup(['vm.docSvc.doc.firstName', 'vm.docSvc.doc.lastName', 'vm.docSvc.doc.companyName'], function (newVal, oldVal, scope) {
            if (newVal) {
                self.detailTitle = {
                    leader: 'Customer Detail: ',
                    text: `${self.docSvc.doc.companyName || ''}${self.docSvc.doc.companyName 
                        ? ` (${self.docSvc.doc.firstName} ${self.docSvc.doc.lastName})` 
                        : `${self.docSvc.doc.firstName} ${self.docSvc.doc.lastName}`}`
                };
            }
        });
    };

    this.addContract = function () {

        var dialogConfig = {
            template: require('apply!./templates/contract.jade'),
            controller: 'tmDialogAddDocPartCtrl as vm',
            locals: {
                schema: ninjaSchemas.events.Contract,
                headerText: 'Add Event',
                item: { customer: tmCustomerDocSvc.doc._id }
            }
        };
        var Contract = $dataSource.load('Contract');
        self.tmDialogSvc.showDialog(dialogConfig).then(function (item) {
            Contract.add(item).then(function (item) {
                self.docSvc.addContract(item);
                self.docSvc.saveChanges().then(function () {
                    if (self.contractsList == undefined) {
                        self.contractsList = [];
                    }
                    self.contractsList.push(item);
                    self.docSvc.refreshFromServer();
                    //self.getRelatedContracts(); //we want to get the most recent contract that was just made...

                });


            });
        });

    };

    this.addAddress = function (index, item) {
        var itemCopy;
        if (!item) {
            itemCopy = {};
        } else {
            itemCopy = angular.copy(item);
        }
        var dialogConfig = {
            template: require('apply!./templates/address.jade'),
            controller: 'tmDialogAddDocPartCtrl as vm',
            locals: {
                schema: ninjaSchemas.sharedSchemas.address,
                headerText: 'Add Address',
                item: itemCopy
            }
        };
        self.tmDialogSvc.showDialog(dialogConfig).then(function (item) {
            if (!index && index != 0) {
                self.docSvc.addAddress(item);
            } else {
                self.docSvc.updateAddress(index, item);
            }
            self.docSvc.saveChanges().then(function () {
                self.docSvc.refreshFromServer();
            });

        });
    };


    this.addEmail = function (index, item) {
        var itemCopy;
        if (!item) {
            itemCopy = {};
        } else {
            itemCopy = angular.copy(item);
        }
        var dialogConfig = {
            template: require('apply!./templates/email.jade'),
            controller: 'tmDialogAddDocPartCtrl as vm',
            locals: {
                schema: ninjaSchemas.sharedSchemas.email,
                headerText: 'Add Email',
                item: itemCopy
            }
        };
        self.tmDialogSvc.showDialog(dialogConfig).then(function (item) {
            if (!index && index != 0) {
                self.docSvc.addEmail(item);
            } else {
                self.docSvc.updateEmail(index, item);
            }
            self.docSvc.saveChanges().then(function () {
                self.docSvc.refreshFromServer();
            });
        });
    };

    this.addPhoneNumber = function (index, item) {
        var itemCopy;
        if (!item) {
            itemCopy = {};
        } else {
            itemCopy = angular.copy(item);
        }
        var dialogConfig = {
            template: require('apply!./templates/phoneNumber.jade'),
            controller: 'tmDialogAddDocPartCtrl as vm',
            locals: {
                schema: ninjaSchemas.sharedSchemas.phoneNumber,
                headerText: 'Add Phone Number',
                item: itemCopy
            }
        };
        self.tmDialogSvc.showDialog(dialogConfig).then(function (item) {
            if (!index && index != 0) {
                self.docSvc.addPhoneNumber(item);
            } else {
                self.docSvc.updatePhoneNumber(index, item);
            }
            self.docSvc.saveChanges().then(function () {
                self.docSvc.refreshFromServer();
            });
        });
    };


    this.removeAddress = function (index) {
        var self = this;
        self.tmDialogSvc.showDialog({}, self.dialogOptions).then(function () {
            self.docSvc.removeAddress(index);
        });

    };

    this.removeEmail = function (index) {
        var self = this;
        self.tmDialogSvc.showDialog({}, self.dialogOptions).then(function () {
            self.docSvc.removeEmail(index);
        });

    };

    this.removePhoneNumber = function (index) {
        var self = this;
        self.tmDialogSvc.showDialog({}, self.dialogOptions).then(function () {
            self.docSvc.removePhoneNumber(index);
        });

    };



    return this;

}

tmCustomerDetailCtrl.$inject = [
    '$scope',
    'tmDetailFactory',
    'tmCustomerDocSvc',
    '$dataSource',
    '$http'
];

export default tmCustomerDetailCtrl;