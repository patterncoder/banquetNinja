import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';
import config from 'config';

function tmContractDetailCtrl(
    $scope,
    tmDetailFactory,
    tmContractDocSvc,
    $timeout,
    uibDateParser,
    $state
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmContractDocSvc,
        schema: ninjaSchemas.events.Contract,
        model: "Contract",
        listView: "root.contracts",
        detailView: "root.contractDetail",
        addHeaderText: "Add Contract"
    };

    this.__proto__ = tmDetailFactory(constructorArgs);


    this.sectionsHidden = true;
    this.menuGroups = [];
    this.menuObjs = [];
    this.filterSection = undefined;

    self.models = { newEventStep: {} };

    _.forEach(ninjaSchemas.events.Contract.paths.eventSteps.schema.paths, (item, key) => {
        self.models.newEventStep[key] = null;
    }, {});

    this.addEventStep = function () {
        self.models.newEventStep.time.setMilliseconds(0);
        self.models.newEventStep.time.setSeconds(0);
        this.docSvc.addTimeline(self.models.newEventStep);
        self.models.newEventStep = _.mapValues(self.models.newEventStep, () => null);
    };

    this.moreFunctions.print = {
        label: "Print HTML",
        method: function () {
            $state.go('root.contracts.print', { id: self.docSvc.doc._id });
        }
    };


    this.moreFunctions.pdf = {
        label: "Print PDF",
        method: function () {

            let url = `${config.apiBase}/events/contracts/${self.$stateParams.id}/view/pdf`;
            var req = {
                method: 'GET',
                url: url,
                responseType: 'arraybuffer'
            };
            self.$http(req).then(function (result) {
                console.log(result);
                var file = new Blob([result.data], { type: 'application/pdf' });
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            });
        }
    };


    this.contractStatusOptions = constructorArgs.schema.paths.status.enumValues.map((status) => status);

    this.serviceTypeOptions = constructorArgs.schema.paths.serviceType.enumValues.map((serviceTypes) => serviceTypes);

    this.moreFunctions.addItem.method = function () {

        var dialogConfig = {
            template: require('apply!./addContract.jade'),
            controller: 'tmAddContractCtrl as vm',
            locals: {
                model: 'Contract',
                schema: self.constructorArgs.schema,
                listView: self.constructorArgs.listView,
                detailView: self.constructorArgs.detailView,
                headerText: self.constructorArgs.addHeaderText,
                hideCustomerInput: false
            }
        };
        self.tmDialogSvc.showDialog(dialogConfig);
    };

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

    this.loadData().then((data) => {
        this.getDetailTitle();

        // I would like to load up Menu Groups also...
        let menuGroups = this.docSvc.$dataSource.load("MenuGroup");
        menuGroups.query().then((returned) => {
            console.log("menuGroups:", returned);
            this.menuGroups = returned;
            console.log("menuGroups:", this.menuGroups);
        });
    });

    let cleanup = (obj) => {
        // for some reason searchGroup doesn't change when selecting another group...

        obj.menuObjs = [];
        obj.addableMenuItems = [];
        obj.filterMenu = undefined;
        obj.filterSection = undefined;
    }

    this.getMenus = () => {
        cleanup(self);

        let caller = (menus, indx) => {
            let obj = menus[indx];
            let Menu = this.docSvc.$dataSource.load("Menu");

            let q = {
                "_id": obj.menuId
            };

            Menu.query(q).then((returned) => {
                this.menuObjs.push(returned);
                ++indx;
                if (menus[indx]) { //check if we need to keep going.
                    caller(menus, indx); //call function again.
                } else {
                    console.log("menuObjs:", this.menuObjs);
                    this.sectionsHidden = false; //unhide...
                }

                try {
                    //must clear the cache, or we will keep getting the same menus for every group...
                    this.docSvc.$dataSource.clearCache();
                } catch (e) {
                    console.log(e);
                }
            });
        };

        caller(this.searchGroup.menus, 0);

    };

    this.showMenuItems = () => {
        this.addableMenuItems = this.filterSection.items;
    };

    this.getDetailTitle = function () {
        const customer = self.docSvc.doc.customer;
        if (customer) {
            self.detailTitle = {
                leader: 'Event for: ',
                text: `${customer.lastName}, ${customer.firstName}`
            };
        } else {
            self.detailTitle = {
                leader: 'Event for: ',
                text: 'unknown customer'
            }
        }
    };

    this.sideTab = {
        menuItems: false,
        rentalItems: false,
        timeline: false,
        rooms: false,
        commLog: false
    };

    this.openSideTab = function (tab) {
        for (var k in this.sideTab) {
            this.sideTab[k] = false;
        }
        this.sideTab[tab] = true;
    };

    this.closeSideTab = function () {
        for (var k in this.sideTab) {
            this.sideTab[k] = false;
        }
    };

    this.removeVenue = function (index) {
        self.docSvc.removeVenue(index);
    };

    this.addItem = (item) => {
        console.log("adding this:", item);
        console.log("menuItems:", this.docSvc.doc.menuItems);
        this.docSvc.doc.menuItems.push(item);
    };



    this.format = 'shortDate';
    this.timeFormat = 'h:mm a';
    this.datePickerOptions = {
        //dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };
    this.status = {
        timePickerOpen: false,
        datePickerOpen: false
    };
    this.openDatePicker = function () {
        this.status.datePickerOpen = true;
    };
    this.closeTimePicker = function () {
        this.status.timePickerOpen = false;
    };

    this.doneEditing = function (item) {
        delete item.isEditing;
        delete item.clickedField;
    };

    this.editMenuItem = function (item, index, clickedField) {
        if (index < 0 || index > this.docSvc.doc.menuItems.length - 1) return;
        $timeout(function () {
            item.isEditing = true;
            item.clickedField = {};
            item.clickedField[clickedField] = true;
        }, 0);

    };

    this.arrowKeyOut = function (item, index, event, clickedField) {
        if (event.keyCode == 38) {
            this.editMenuItem(this.docSvc.doc.menuItems[--index], index--, clickedField);
        }
        if (event.keyCode == 40) {
            this.editMenuItem(this.docSvc.doc.menuItems[++index], index++, clickedField);
        }
    };

    this.detailBlur = function (item, index, event) {
        var relatedTarget = event.relatedTarget || event.explicitOriginalTarget;
        if (relatedTarget == null || event.target.parentElement.parentElement != relatedTarget.parentElement.parentElement) {
            $timeout(function () {
                delete item.isEditing;
                delete item.clickedField;
            }, 0);

        }
    };

    this.deleteMenuItem = function (index) {
        this.docSvc.removeMenuItem(index);
    };

    this.removeRentalItem = function (index) {
        this.docSvc.removeRentalItem(index);
    }


    return this;

}

tmContractDetailCtrl.$inject = [
    '$scope',
    'tmDetailFactory',
    'tmContractDocSvc',
    '$timeout',
    'uibDateParser',
    '$state'
];

export default tmContractDetailCtrl;