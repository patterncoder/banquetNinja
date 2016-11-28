function tmListFactory (
    $dataSource,
    tmNotifier,
    tmDialogSvc,
    $state
) { 
    return function(constructorArgs){
        return new BaseList(
            $dataSource,
            tmNotifier,
            tmDialogSvc,
            $state,
            constructorArgs
        );
    };
}

tmListFactory.$inject = [
    '$dataSource',
    'tmNotifier',
    'tmDialogSvc',
    '$state'
];

export default tmListFactory;

function BaseList (
    $dataSource,
    tmNotifier,
    tmDialogSvc,
    $state,
    constructorArgs
) {
    this.constructorArgs = constructorArgs;
    
    this.isLoading = false;
    this.tmNotifier = tmNotifier;
    this.Model = $dataSource.load(this.constructorArgs.model);
    this.tmDialogSvc = tmDialogSvc;
    this.$state = $state;
    this.sortOptions = [{ value: "name", text: "Sort by Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];
    
    
    this.setLoading = function(loading){
        this.isLoading = loading;
    };
    
    this.loadData = function(queryString){
        var self = this;
        self.setLoading(true);
        self.Model.query(queryString).then(function(items){
            self.setLoading(false);
            self.items = items;
        });
    };
    
    this.addItemDialog = function (){
            var self = this;
            var dialogConfig = {
                template: require('apply!./tmDialogAddItem.jade'),
                controller: 'tmDialogAddItemCtrl as vm',
                locals: {model: this.Model,
                        schema: this.constructorArgs.schema,
                        listView: this.constructorArgs.listView,
                        detailView: this.constructorArgs.detailView,
                        headerText: this.constructorArgs.addHeaderText}
            };
            self.tmDialogSvc.showDialog(dialogConfig);
    };
    
    this.details =  function(id){
        this.$state.go(this.constructorArgs.detailView, {id: id});
    };

    this.print = function(id){
        this.$state.go(this.constructorArgs.printView, {id: id});
    }
    
    this.deleteItem = function(id){
        var self = this;
        var dialogOptions = {
                    closeButtonText: 'No',
                    actionButtonText: 'Yes',
                    headerText: 'Delete?',
                    bodyText: 'Do you want to delete this record and all associated data?'
            };
        self.tmDialogSvc.showDialog({},dialogOptions).then(function(){
            self.Model.remove(id).then(function(collection){
            self.tmNotifier.notify("The item has been deleted");
            self.items = collection;
            });
        },function(){
            
        });
        
    };
}
