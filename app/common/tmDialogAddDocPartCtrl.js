import ninjaSchemas from 'ninjaSchemas';

class tmDialogAddDocPartCtrl {
    constructor(
        $scope, 
        $state,
        $mdDialog, 
        tmMongoose,
        schema,
        headerText,
        item
        ) {
            
            
            this.$scope = $scope;
            this.$state = $state;
            this.schema = schema;
            this.dialogOptions = {headerText: headerText};
            this.$mdDialog = $mdDialog;
            this.tmMongoose = tmMongoose;
            this.item = item || {}; 
            this.validationError = null;
        }
        
    
    
    cancel() {
        this.$mdDialog.cancel();
    }
    
    addDocPart(){
        var self = this;
        var newItem = new self.tmMongoose.Document(self.item, self.schema);
        newItem.validate(function(err){
            if(err) {
                self.validationError = err
                self.$scope.$apply();
                return;
            }
            self.$mdDialog.hide(self.item);
        });
        
       
    }
}



tmDialogAddDocPartCtrl.$inject = [
    '$scope',
    '$state',
    '$mdDialog',
    'tmMongoose',
    'schema',
    'headerText',
    'item'
];

export default tmDialogAddDocPartCtrl;