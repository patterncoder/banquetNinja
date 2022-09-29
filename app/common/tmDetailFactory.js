function tmDetailFactory(
    $http,
    $q,
    $state,
    $stateParams,
    tmNotifier,
    tmDialogSvc,
    tmWindowStorage

) {
    return function (constructorArgs) {
        return new BaseDetail(
            $http,
            $q,
            $state,
            $stateParams,
            tmNotifier,
            tmDialogSvc,
            tmWindowStorage,
            constructorArgs
        );
    };
}

tmDetailFactory.$inject = [
    '$http',
    '$q',
    '$state',
    '$stateParams',
    'tmNotifier',
    'tmDialogSvc',
    'tmWindowStorage'
];

export default tmDetailFactory;

function BaseDetail(
    $http,
    $q,
    $state,
    $stateParams,
    tmNotifier,
    tmDialogSvc,
    tmWindowStorage,
    constructorArgs
) {
    var self = this;
    this.$scope = constructorArgs.$scope;
    this.isLoading = false;
    this.$stateParams = $stateParams;
    this.tmNotifier = tmNotifier;
    this.tmDialogSvc = tmDialogSvc;
    this.tmWindowStorage = tmWindowStorage;
    this.$state = $state;
    this.$q = $q;
    this.$http = $http;
    this.docSvc = constructorArgs.docSvc;
    //this.docSvc.loadDocument($stateParams.id);
    this.constructorArgs = constructorArgs;


    this.moreFunctions = {
        addItem: {
            label: constructorArgs.addHeaderText,
            method: function () {
                self.addItem();
            }
        }, 
        refresh: {
            label: "Refresh",
            method: function () {
                self.docSvc.refreshFromServer();
            }
        },
        delete: {
            label: "Delete",
            method: function () {
                var dialogOptions = {
                    closeButtonText: 'No',
                    actionButtonText: 'Yes',
                    headerText: 'Delete?',
                    bodyText: 'Do you want to delete this record and all associated data?'
                };
                self.tmDialogSvc.showDialog({}, dialogOptions).then(function () {
                    //were not supposed to actually delete, only MARK deleted...
                    
                    self.docSvc.doc.status = "abandoned";

                    try {
                        self.docSvc.saveChanges();
                    } catch (e) {
                        console.log(e);
                    }

                    //self.docSvc.deleteDocument();
                    //$state.go(self.constructorArgs.listView);
                    self.$state.go(self.$state.back.fromState, self.$state.back.fromParams);
                    // self.Model.remove(id).then(function (collection) {
                    //     self.tmNotifier.notify("The item has been deleted");
                    //     self.items = collection;
                    // });
                }, function () {

                });
            }
        }
    };



    this.setLoading = function (loading) {
        this.isLoading = loading;
    };

    this.getDetailTitle = function () {
        self.detailTitle = {
            leader: `${self.constructorArgs.model} Record Detail`,
            text: ' '
        };
    };

    this.loadData = function (queryStringParams) {
        var self = this;
        self.setLoading(true);
        return this.docSvc.loadDocument(this.$stateParams.id, queryStringParams).then(function (doc) {
            self.setLoading(false);
            self.getDetailTitle();
            return doc;
        });
    };

    this.addItem = function () {
        var self = this;
        this.canILeave().then(function (canILeave) {
            if (canILeave) {
                var dialogConfig = {
                    template: require('apply!./tmDialogAddItem.jade'),
                    controller: 'tmDialogAddItemCtrl as vm',
                    locals: {
                        model: self.constructorArgs.model,
                        schema: self.constructorArgs.schema,
                        listView: self.constructorArgs.listView,
                        detailView: self.constructorArgs.detailView,
                        headerText: self.constructorArgs.addHeaderText
                    }
                };
                self.tmDialogSvc.showDialog(dialogConfig);

            }
        });
    };

    this.reset = function () {
        var self = this;
        self.docSvc.undoChanges();
        self.$scope.vm.detailForm.$setPristine();
        self.$scope.vm.detailForm.$setUntouched();
    };

    this.allowTransitionAway = function () {
        return this.$scope.vm.detailForm.$pristine;
    };

    this.canILeave = function () {
        var deferred = this.$q.defer();
        var canILeave = false;
        if (this.allowTransitionAway()) {
            canILeave = true;
            deferred.resolve(canILeave);
        } else {
            var dialogOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes',
                headerText: 'Wait!',
                bodyText: 'Do you want to leave without saving??'
            };
            this.tmDialogSvc.showDialog({}, dialogOptions).then(function (result) {
                canILeave = true;
                deferred.resolve(canILeave);
            }, function (result) {
                canILeave = false;
                deferred.resolve(canILeave);
            });
        }
        return deferred.promise;
    };


    this.close = function () {
        var self = this;
        this.canILeave().then(function (canILeave) {
            if (canILeave) {
                let backState = self.$state.back.fromState.name;
                self.docSvc.clearDocument();
                // !($state.data === backState) handle circlular issue with back button
                // the back state and the to state are the same
                if (backState && backState != "" && !($state.data === backState)) {
                    self.$state.go(backState, $state.back.fromParams);
                } else {
                    // we are going back to the list so clear out the $state.data for next circular issue
                    $state.data = null;
                    self.$state.go(self.constructorArgs.listView);
                }
            }
        });
    };

    this.saveChanges = function (saveAndGo) {
        var self = this;
        self.setLoading(true);
        saveAndGo = self.closeButtonText === 'Save and Close' ? true : false;
        this.docSvc.saveChanges().then(function (data) {
            self.$scope.vm.detailForm.$setPristine();
            self.$scope.vm.detailForm.$setUntouched();
            self.getDetailTitle();
            self.tmNotifier.detailNotify("The item has been saved.");
            self.setLoading(false);
            if (saveAndGo) {
                self.close();
            }
        }, function (err) {
            console.log(err);
            self.tmNotifier.error("There was a problem with saving...try again.");
        });
    };

    this.setUISettings = function () {
        this.tmWindowStorage.setLocalKey('closeDropDown', this.closeButtonText);
    };

    this.getUISettings = function () {
        var dropDownText = this.tmWindowStorage.getLocalKey('closeDropDown');
        if (!dropDownText) {
            this.closeButtonText = 'Save and Stay';
        } else {
            this.closeButtonText = dropDownText;
        }
    };

    this.openSaveMenu = function ($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    };

    this.setSaveButton = function (text) {
        this.tmWindowStorage.setLocalKey('closeDropDown', text);
        this.closeButtonText = text;
        this.saveChanges();
    };

    this.closeButton = function () {
        this.saveChanges();
    };

    this.openMoreMenu = function ($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    };

    this.getUISettings();
}

