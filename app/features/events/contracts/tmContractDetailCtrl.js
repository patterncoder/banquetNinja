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
    $state,
    tmIdentity
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
    console.log("we are at tmContractDetailCtrl");

    console.log("what is our close?", self.close);


    //close overrides from tmDetailFactory.js
    this.close = () => {
        this.canILeave().then((result) => {

            if (result) {

                if (this.docSvc.doc.hasOwnProperty("status")) {
                    if (this.docSvc.doc.status == "pending") {
                        this.docSvc.clearDocument();
                        this.$state.go("root.contractsPending");
                    } else {
                        this.docSvc.clearDocument();
                        this.$state.go(this.constructorArgs.listView);
                    }
                } else {
                    this.docSvc.clearDocument();
                    this.$state.go(this.constructorArgs.listView);
                }
            }
        });
    };

    this.sectionsHidden = true;
    this.statusHidden = true;
    this.menuGroups = [];
    this.menuObjs = [];
    this.filterSection = undefined;
    this.addableRentalItems = [];

    self.models = {
        newEventStep: {},
        newDeposit: {},
        newCommLog: {},
    };

    _.forEach(ninjaSchemas.events.Contract.paths.eventSteps.schema.paths, (item, key) => {
        self.models.newEventStep[key] = null;
    }, {});

    this.addEventStep = function () {
        self.models.newEventStep.time.setMilliseconds(0);
        self.models.newEventStep.time.setSeconds(0);
        this.docSvc.addTimeline(self.models.newEventStep);
        self.models.newEventStep = _.mapValues(self.models.newEventStep, () => null);
    };

    this.addDeposit = () => {
        //add the deposit
        self.models.newDeposit.dateAdd = new Date();
        if (self.models.newDeposit.date) {
            self.models.newDeposit.date.setMilliseconds(0);
            self.models.newDeposit.date.setSeconds(0);
        }
        this.docSvc.addDeposit(self.models.newDeposit); //submits?
        self.models.newDeposit = _.mapValues(self.models.newDeposit, () => null); //clears all of the values?
    };

    this.addCommLog = function (logType) {
        console.log("addCommLog called!", logType);

        this.models.newCommLog.employee = `${tmIdentity.currentUser.user.firstName} ${tmIdentity.currentUser.user.lastName}`;

        this.docSvc.addCommLog(self.models.newCommLog);
    };

    this.moreFunctions.pdf = {
        label: "Print PDF",
        method: function () {
            let openPDF = () => {
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
            };

            //lets save the contract before trying to print it!
            self.setLoading(true);
            self.docSvc.saveChanges().then(() => {
                openPDF();
                self.setLoading(false);
            }, (err) => {
                self.tmNotifier.error("There was a problem with saving...");
                self.setLoading(false);
            });
        }
    };

    this.moreFunctions.setSettings = {
        label: "Print Settings",
        method: () => {
            //$state.go('root.settings.print', { id: self.docSvc.doc._id });

            //close all side tabs.
            for (let property in this.sideTab) {
                this.sideTab[property] = false;
            }
            this.sideTab.printSettings = true;
        }
    };

    this.moreFunctions.printHandoutPDF = {
        label: "Print Handouts",
        method: () => {

            console.log("print the handout!");

            let url = `${config.apiBase}/events/contracts/${self.$stateParams.id}/view/handoutPdf`;
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
    }

    this.moreFunctions.printCommLogPDF = {
        label: "Print Communications",
        method: () => {

            console.log("print the commLog!");

            let url = `${config.apiBase}/events/contracts/${self.$stateParams.id}/view/commLogPdf`;
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
    }

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

    let cleanup = (obj) => {


        // obj.menuObjs = [];
        obj.addableMenuItems = [];
        obj.addableRentalItems = [];
        obj.filterMenu = undefined;
        obj.filterSection = undefined;
    };

    this.loadData().then((data) => {
        cleanup(this); //making sure everything is clean.
        this.getDetailTitle();

        //working with some historical data for service type.
        if (!this.docSvc.doc["serviceType"] && this.docSvc.doc.natureOfEvent) {
            let natureOfEvent = this.docSvc.doc.natureOfEvent.toLowerCase();
            if (this.serviceTypeOptions.indexOf(natureOfEvent) !== undefined) {
                this.docSvc.doc.serviceType = this.docSvc.doc.natureOfEvent.toLowerCase();
            }
        }

        console.log("what are we?", this.docSvc.doc.status);

        // I would like to load up Menu Groups also...
        let menuGroups = this.docSvc.$dataSource.load("MenuGroup");
        menuGroups.query().then((returned) => {
            // console.log("menuGroups:", returned);
            this.menuGroups = returned;
            // console.log("menuGroups:", this.menuGroups);
        });
    });

    let getByID = (type, id) => {
        let dfd = new Promise((resolve, reject) => {

            try {
                //must clear the cache, or we will keep getting the same menus for every group...
                let tmp = this.docSvc.$dataSource.clearCache();
                console.log("clearCache:", tmp);
            } catch (e) {
                console.log("err:", e);
                //reject(e);
                //return;
            }

            try {
                let Obj = this.docSvc.$dataSource.load(type);
                let q = {
                    "_id": id,
                };
                Obj.query(q).then((returned) => {
                    resolve(returned);
                });
            } catch (e) {
                console.log("err:", e);
                reject(e);
                return;
            }
        });

        return dfd;
    };

    let toggle = (bl) => {
        console.log("toggle");
        this.sectionsHidden = bl;
        this.statusHidden = !bl;
    };

    let getDateLastYear = (o) => {
        let now = new Date();
        now.setFullYear(now.getFullYear() - o ? o : 1);
        return now;
    };

    this.runSearch = (type, value) => {
        let settings = {
            url: `${config.apiBase}${type.schema ? type.schema : "/production/menuItems"}?like[name]=.*${value}.*`,
            years: 10,
            model: type.model ? type.model : "addableMenuItems"
        };

        let request = {
            method: "GET",
            url: settings.url
        };

        let filtered = [];
        this.$http(request).then((data) => {
            console.log("data: ", data);

            let tmp = data.data;

            let filter = (dta) => {
                dta.map((menItm) => {
                    let dt = new Date(menItm.meta.dateLastMod || menItm.meta.dateCreated);
                    if (dt.getTime() >= (getDateLastYear(settings.years).getTime())) {
                        filtered.push(menItm);
                    }
                });
            };

            if (tmp.length) {
                filter(tmp);
            } else if (tmp.hasOwnProperty("data")) {
                filter(tmp.data);
            }

            this[settings.model] = filtered;
            console.log(`${settings.model}: `, this[settings.model]);
        });

    };

    this.getMenus = () => {
        toggle(true);
        cleanup(this);

        let tmp = []; //stores promises.

        console.log("searchGroup: ", this.searchGroup);

        this.searchGroup.menus.map((menu) => {
            console.log("getMenus: ", menu);
            if (!menu.menuId) {
                menu.menuId = menu["_id"];
            }
            tmp.push(getByID("Menu", menu.menuId));
        });

        Promise.all(tmp).then((obj) => { //waits until all done.
            console.log("PROMISE ALL: ", obj);
            this.menuObjs = obj; //updates for angular all at once.
            toggle(false); //display the results.
            $scope.$apply(); //DOM WILL NOT PROPERLY REFRESH WITHOUT THIS!!!
        });
    };

    this.showMenuItems = () => {
        console.log("showMenuItems: ", this.filterSection);
        this.addableMenuItems = this.filterSection.items;
        console.log(this.addableMenuItems);
        //this.sectionsHidden = true;
    };

    this.addSectionDivider = () => {
        console.log("called addSectionDivider");
        /*
        var menuItem = {
            sortOrder: Number,
            name: String,
            description: String,
            baseId : {type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem'},
            quantity: Number,
            price: Number
        };
        */
        let divider = {
            name: "New Divider",
            description: "This is a divider",
            baseId: "5e503ce5229c5d33d41b05a7", //this is the id of a random menu item for testing purposes.
            quantity: 0,
            price: 0,
            itemType: "divider"
        };
        this.docSvc.doc.menuItems.push(divider);
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
        commLog: false,
        printSettings: false,
    };

    this.openSideTab = function (tab) {
        for (var k in this.sideTab) {
            this.sideTab[k] = false;
        }
        this.sideTab[tab] = true;
        console.log("sidetab:", this.sideTab, "tab:", tab);
    };

    this.closeSideTab = function () {
        for (var k in this.sideTab) {
            this.sideTab[k] = false;
        }
        console.log("sideTab:", this.sideTab);
    };

    this.removeVenue = function (index) {
        self.docSvc.removeVenue(index);
    };

    this.addStaffMember = (staffMember) => {
        console.log("adding:", staffMember);
        if (this.doc.assignedStaff == undefined) {
            this.doc.assignedStaff = [];
        }
        this.doc.assignedStaff.push(staffMember);
    };

    this.addEmpty = () => {

        console.log("called addEmpty");
        /*
        var menuItem = {
            sortOrder: Number,
            name: String,
            description: String,
            baseId : {type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem'},
            quantity: Numbejr,
            price: Number
        };
        */
        let item = {
            printOnHandoutMenu: false,
            name: "New Item",
            description: "Description",
            baseId: "5e503ce5229c5d33d41b05a7", //reuires a valid id.
            quantity: 0,
            price: 0,
            itemType: ""
        };
        // this.docSvc.doc.menuItems.push(divider);

        this.addItem(item);
    };

    this.addItem = (item) => {
        console.log("item:", item);
        // getByID("MenuItem", item.menuItemId).then((returned) => {

        //     console.log("adding this:", returned);
        //     console.log("menuItems:", this.docSvc.doc.menuItems);
        //     this.docSvc.doc.menuItems.push(returned);

        //     try {
        //         //must clear the cache, or we will keep getting the same menus for every group...
        //         this.docSvc.$dataSource.clearCache();
        //     } catch (e) {
        //         console.log(e);
        //     }
        // });
        console.log("adding this:", item);
        console.log("menuItems:", this.docSvc.doc.menuItems);
        this.docSvc.doc.menuItems.push(item);
    };

    this.addRentalItem = (item) => {
        console.log("item:", item);
        this.docSvc.doc.rentalItems.push(item);
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
    '$state',
    'tmIdentity'
];

export default tmContractDetailCtrl;