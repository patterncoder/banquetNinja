import ninjaSchemas from 'ninjaSchemas';

class tmDialogAddDocPartCtrl {
    constructor(
        $scope, 
        //$dataSource, 
        //tmNotifier, 
        $state,
        //$rootScope,
        $mdDialog, 
        tmMongoose,
        schema,
        headerText,
        item
        ) {
            
            
            this.$scope = $scope;
            //this.$rootScope = $rootScope;
            //this.tmNotifier = tmNotifier;
            this.$state = $state;
            //this.model = model;
            this.schema = schema;
            //this.listView = listView;
            //this.detailView = detailView;
            this.dialogOptions = {headerText: headerText};
            this.$mdDialog = $mdDialog;
            this.tmMongoose = tmMongoose;
            this.item = item || {}; 
            //this.fields = [];
            this.validationError = null;
        }
        
    
    
    cancel() {
        this.$mdDialog.cancel();
    }
    
    addDocPart(){
        var self = this;
        var newItem = new self.tmMongoose.Document(self.item, self.schema);
        newItem.validate(function(err){
            console.log("breakpoint test", self.$state);
            if(err) {
                self.validationError = err
                self.$scope.$apply();
                return;
            }
            //self.$rootScope.$digest();
            self.$mdDialog.hide(self.item);
            //self.$state.reload();
            //the view needs to update... but it's not... 
        });
        
       
    }
}



tmDialogAddDocPartCtrl.$inject = [
    '$scope',
    //'$dataSource',
    //'tmNotifier',
    '$state',
    //'$rootScope',
    '$mdDialog',
    'tmMongoose',
    //'model',
    'schema',
    //'listView',
    //'detailView',
    'headerText',
    'item'
];

export default tmDialogAddDocPartCtrl;