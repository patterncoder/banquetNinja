function tmListFactory(
    $http,
    $dataSource,
    tmNotifier,
    tmDialogSvc,
    $state,
    $stateParams
) {
    return function (constructorArgs) {
        return new BaseList(
            $http,
            $dataSource,
            tmNotifier,
            tmDialogSvc,
            $state,
            $stateParams,
            constructorArgs
        );
    };
}

tmListFactory.$inject = [
    '$http',
    '$dataSource',
    'tmNotifier',
    'tmDialogSvc',
    '$state',
    '$stateParams'
];

export default tmListFactory;

function BaseList(
    $http,
    $dataSource,
    tmNotifier,
    tmDialogSvc,
    $state,
    $stateParams,
    constructorArgs
) {
    this.constructorArgs = constructorArgs;

    this.isLoading = false;
    this.tmNotifier = tmNotifier;
    this.Model = $dataSource.load(this.constructorArgs.model);
    this.tmDialogSvc = tmDialogSvc;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$http = $http;
    this.sortOptions = [{ value: "name", text: "Sort by Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];
    
    this.$scope = constructorArgs.$scope;



    this.setLoading = function (loading) {
        this.isLoading = loading;
    };

    this.loadData = function (queryString, flush, noCache) {
        var self = this;
        let dfd = new Promise((resolve, reject) => {
            self.setLoading(true);
            self.Model.query(queryString, flush, noCache).then(function (items) {
                self.setLoading(false);
                self.items = items;
                self.afterLoad();
                resolve(items);
            });
        });
        return dfd; //returns a promise, so we can work with the data.
    };

    this.afterLoad = function () { };

    this.addItemDialog = function (schemaExtensions) {
        var self = this;
        if (schemaExtensions) {
            this.constructorArgs.schema.add(schemaExtensions);
        }
        var dialogConfig = {
            template: require('apply!./tmDialogAddItem.jade'),
            controller: 'tmDialogAddItemCtrl as vm',
            locals: {
                model: this.Model,
                schema: this.constructorArgs.schema,
                listView: this.constructorArgs.listView,
                detailView: this.constructorArgs.detailView,
                headerText: this.constructorArgs.addHeaderText,
                hideDetailButton: this.constructorArgs.hideDetailButton,
                documentToClone: null
            }
        };
        self.tmDialogSvc.showDialog(dialogConfig).then(function (data) {
            self.afterAddItemDialogClose && self.afterAddItemDialogClose();
        });
    };



    this.details = function (id) {
        this.$state.go(this.constructorArgs.detailView, { id: id });
    };

    this.print = function (id) {
        this.$state.go(this.constructorArgs.printView, { id: id });
    };

    this.deleteItem = function (id) {
        var self = this;
        var dialogOptions = {
            closeButtonText: 'No',
            actionButtonText: 'Yes',
            headerText: 'Delete?',
            bodyText: 'Do you want to delete this record and all associated data?'
        };
        self.tmDialogSvc.showDialog({}, dialogOptions).then(function () {
            self.Model.remove(id).then(function (collection) {
                var item = self.items.map(function (i) {
                    return i._id;
                }).indexOf(id);
                self.items.splice(item, 1);
                self.tmNotifier.notify("The item has been deleted");
            });
        }, function () {

        });

    };
}
