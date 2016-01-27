function tmDetailFactory (
    $q,
    $state, 
    $stateParams, 
    tmNotifier,
    tmDialogSvc 
    ) {
    return function (constructorArgs) {
        return new BaseDetail(
            $q,
            $state, 
            $stateParams, 
            tmNotifier,
            tmDialogSvc,
            constructorArgs
        );
    }
}

tmDetailFactory.$inject = [
    '$q',
    '$state',
    '$stateParams',
    'tmNotifier',
    'tmDialogSvc',
];

export default tmDetailFactory

function BaseDetail (
            $q,
            $state, 
            $stateParams, 
            tmNotifier,
            tmDialogSvc,
            constructorArgs
        ) {
    var self = this;
    this.$scope = constructorArgs.$scope;
    this.isLoading = false;
    this.$stateParams = $stateParams;
    this.tmNotifier = tmNotifier;
    this.tmDialogSvc = tmDialogSvc;
    this.$state = $state;
    this.$q = $q;
    this.docSvc = constructorArgs.docSvc;
    this.docSvc.loadDocument($stateParams.id);
    this.constructorArgs = constructorArgs;
    console.log(this.$scope);
    
    
    
    
    this.setLoading = function(loading){
        this.isLoading = loading;
    };
    
    this.loadData = function(){
        var self = this;
        self.setLoading(true);
        this.docSvc.loadDocument(this.$stateParams.id).then(function(){
            self.setLoading(false);
        });
    };
    
    this.addItem = function(){
        var self = this;
        this.canILeave().then(function(canILeave){
            if(canILeave){
                var dialogConfig = {
                template: require('apply!./tmDialogAddItem.jade'),
                controller: 'tmDialogAddItemCtrl as vm',
                locals: {model: self.constructorArgs.model,
                        schema: self.constructorArgs.schema,
                        listView: self.constructorArgs.listView,
                        detailView: self.constructorArgs.detailView,
                        headerText: self.constructorArgs.addHeaderText}
                };
                self.tmDialogSvc.showDialog(dialogConfig);
                
            }
        });
    };
    
    this.reset = function(){
        var self = this;
        self.docSvc.undoChanges();
        self.detailForm.$setPristine();
        self.detailForm.$setUntouched();
    };
    
    this.allowTransitionAway = function() {
        return this.detailForm.$pristine;
    };
    
    this.canILeave = function(){
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
            this.tmDialogSvc.showDialog({}, dialogOptions).then(function(result){
                canILeave = true;
                deferred.resolve(canILeave);
            },function(result){
                canILeave = false;
                deferred.resolve(canILeave);
            });
        }
        return deferred.promise;
    };
    
    
    this.close = function(){
        var self = this;
        this.canILeave().then(function(canILeave){
            if(canILeave){
                self.docSvc.clearDocument();
                self.$state.go(constructorArgs.listView);
            }
        })
    };
    
    this.saveChanges = function(saveAndGo){
        var self = this;
        this.docSvc.saveChanges().then(function(){
            self.detailForm.$setPristine();
            self.detailForm.$setUntouched();
            self.tmNotifier.notify("The item has been saved.");
            if(saveAndGo){
                self.close();
            }
        }, function(err){
            self.tmNotifier.error("There was a problem with saving...try again.")
        })
    };
}

