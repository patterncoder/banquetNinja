import ninjaSchemas from 'ninjaSchemas';
import config from 'config';

class tmAddContractCtrl {
    constructor(
        $http,
        $scope,
        $dataSource,
        tmNotifier,
        $state,
        $mdDialog,
        tmMongoose,
        model,
        schema,
        listView,
        detailView,
        headerText,
        hideCustomerInput) {
        if (typeof (model) === 'string') {
            this.model = $dataSource.load(model);
        } else {
            this.model = model;
        }
        this.$dataSource = $dataSource;
        this.$scope = $scope;
        this.tmNotifier = tmNotifier;
        this.$state = $state;
        this.$http = $http;
        this.schema = schema;
        this.listView = listView;
        this.detailView = detailView;
        this.dialogOptions = { headerText: headerText };
        this.$mdDialog = $mdDialog;
        this.tmMongoose = tmMongoose;
        //this.newItem = new this.tmMongoose.Document({}, schema);
        this.newItem = {};
        this.fields = [];
        this.validationError = null;
        this.getFields();
        this.isLoading = false;
        this.hideCustomerInput = hideCustomerInput;

    }



    getCustomer(val) {
        var req = {
            method: 'GET',
            url: config.apiBase + '/customerSearch',
            params: {
                name: val
            }
        };
        console.log('called getCustomer');
        return this.$http(req).then(function (response) {
            return response.data.data.map(function (item) {

                return { id: item._id, name: item.firstName + ' ' + item.lastName };
            });
        });
    }

    addCustomer(name) {
        this.validationError = null;
        if (!name.match(/\s/)) {
          console.log("new");
          this.validationError = {
            "errors": {
              "customer": {
                "kind": "no space",
                "message": "Pleae include first and last name for customer"
              }
            }
          };
          console.log(this.validationError);
          return false;
        } else {
        }
        var self = this;
        var names = name.split(' ');
        var newCust = {
            firstName: names[0],
            lastName: names[1]
        };
        var req = {
            method: 'POST',
            url: config.apiBase + '/customers',
            data: {
                firstName: names[0],
                lastName: names[1]
            }
        };
        return this.$dataSource.load('Customer').add(newCust).then(function (customer) {
            self.$scope.vm.newItem.customer = { id: customer._id, name:customer.firstName + ' ' + customer.lastName };
            self.$scope.noResults = false;
        });
       
    }

    setLoading(loading) {
        this.isLoading = loading;
    }

    getFields() {
        for (var k in this.schema.paths) {
            if (this.schema.paths.hasOwnProperty(k) && this.schema.paths[k].isRequired) {
                this.fields.push(this.schema.paths[k]);
                this.newItem[k] = null;
            }
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    addItem(nextView) {
        var self = this;
        var newContract = angular.copy(self.newItem);
        newContract.status = "pending";
        console.log(self);
        var custId = self.customerId || newContract.customer.id;
        newContract.customer = custId;
        var newItemDoc = new self.tmMongoose.Document(newContract, this.schema);
        newItemDoc.validate(function (err) {
            if (err) {
                console.log(err);
                self.validationError = err;
                self.$scope.$apply();
                return;
            }
            delete newContract._id;
            self.setLoading(true);
            self.model.add(newContract).then(function (contract) {
                var Customer = self.$dataSource.load('Customer');
                Customer.getOne(custId).then(function (cust) {
                    cust.contracts.push(contract._id);
                    Customer.update(cust).then(function (cust) {
                        self.tmNotifier.notify("Item was successfully added.");
                        self.setLoading(false);
                        self.$mdDialog.hide();
                        if (nextView === 'details') {
                            self.$state.go(self.detailView, { id: contract._id });
                        }
                        if (nextView === 'quick') {
                            console.log("going to ", self.listView);
                            self.$state.go(self.listView);
                        }
                    });

                });

            });
        });


    }
}



tmAddContractCtrl.$inject = [
    '$http',
    '$scope',
    '$dataSource',
    'tmNotifier',
    '$state',
    '$mdDialog',
    'tmMongoose',
    'model',
    'schema',
    'listView',
    'detailView',
    'headerText',
    'hideCustomerInput'
];

export default tmAddContractCtrl;
