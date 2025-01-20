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
        hideDetailButton,
        documentToClone) {
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
            this.documentToClone = documentToClone;
            console.log(this.documentToClone);
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

        var self = this;
        for(var k in this.schema.paths){
            if(this.schema.paths.hasOwnProperty(k) && this.schema.paths[k].isRequired){
                this.fields.push(this.schema.paths[k]);
                this.newItem[k] = self.documentToClone && self.documentToClone[k];
            }
        }
    }
    
    cancel() {
        this.$mdDialog.cancel();
    }
    
    addItem(nextView){
        var self = this;
        var newDocument;
        if (self.documentToClone) {
            newDocument = angular.copy(self.documentToClone);
            delete newDocument.id;
            self.fields.forEach((field) => {
                newDocument[field.path] = self.newItem[field.path];
            });
        } else {
            newDocument = angular.copy(self.newItem.toObject());
        }

        var newItemDoc = new self.tmMongoose.Document(newDocument, this.schema);
        newItemDoc.validate(function(err){
            if(err) {
                console.log(err);
                self.validationError = err;
                self.$scope.$apply();
                return;
            }
            delete newDocument._id;
            self.setLoading(true);
            return self.model.add(newDocument, { skipRequery: true }).then(function(data){
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
    'hideDetailButton',
    'documentToClone'
];

export default tmDialogAddItem;