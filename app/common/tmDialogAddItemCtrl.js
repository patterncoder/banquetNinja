import ninjaSchemas from 'ninjaSchemas';

class tmDialogAddItem {
    constructor(
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
        hideDetailButton) {
            if(typeof(model) === 'string') {
                this.model = $dataSource.load(model);
            } else {
                this.model = model;
            }
            
            this.$scope = $scope;
            this.tmNotifier = tmNotifier;
            this.$state = $state;
            //this.model = model;
            this.schema = schema;
            this.listView = listView;
            this.detailView = detailView;
            this.hideDetailButton = hideDetailButton;
            this.dialogOptions = {headerText: headerText};
            this.$mdDialog = $mdDialog;
            this.tmMongoose = tmMongoose;
            this.newItem = new this.tmMongoose.Document({}, schema);
            this.fields = [];
            this.validationError = null;
            this.getFields();
            this.isLoading = false;
        }
        
    setLoading(loading){
        this.isLoading = loading;
    }
    
    getFields(){
        for(var k in this.schema.paths){
            if(this.schema.paths.hasOwnProperty(k) && this.schema.paths[k].isRequired){
                this.fields.push(this.schema.paths[k]);
                this.newItem[k] = null;
            }
        }
    }
    
    cancel() {
        this.$mdDialog.cancel();
    }
    
    addItem(nextView){
        var self = this;
        self.newItem.validate(function(err){
            if(err) {
                console.log(err);
                self.validationError = err;
                self.$scope.$apply();
                return;
            }
            delete self.newItem._id;
            self.setLoading(true);
            return self.model.add(self.newItem, { skipRequery: true }).then(function(data){
                self.tmNotifier.notify("Item was sucessfully added.")
                self.setLoading(false);
                self.$mdDialog.hide(data);
                if (nextView === 'details') {
                    self.detailView && self.$state.go(self.detailView, { id: data._id});
                }
                if (nextView === 'quick') {
                    self.listView && self.$state.go(self.listView);
                }
                return data;
            });
        });
        
       
    }
}



tmDialogAddItem.$inject = [
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
    'hideDetailButton'
];

export default tmDialogAddItem;