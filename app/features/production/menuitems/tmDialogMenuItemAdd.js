import {productionSchemas} from 'ninjaSchemas';

class tmDialogMenuItemAdd {
    constructor($scope, $dataSource, tmNotifier, $state, $mdDialog, tmMongoose){
        
        this.$mdDialog = $mdDialog;
        this.$dataSource = $dataSource;
        this.tmNotifier = tmNotifier;
        this.$state = $state;
        this.$scope = $scope;
        this.tmMongoose = tmMongoose;
        this.MenuItem = this.$dataSource.load('MenuItem');
        this.dialogOptions = {
            headerText: "Add Menu Item"
        };
        this.newItem = new this.tmMongoose.Document({},productionSchemas.menuitem);
        this.fields = [];
        this.validationError = null;
        this.getFields();
        
    }
    
    getFields() {
        for(var k in productionSchemas.menuitem.paths) {
            if(productionSchemas.menuitem.paths.hasOwnProperty(k) && productionSchemas.menuitem.paths[k].isRequired){
                this.fields.push(productionSchemas.menuitem.paths[k]);
                this.newItem[k] = null;
            }
        }
    }
    
    cancel () {
        this.$mdDialog.cancel();
    }
    
    
    addItem (nextView) {
        var self = this;
        self.newItem.validate(function(err){
            if(err){
                self.validationError = err;
                self.$scope.$apply();
                return
            }
            delete self.newItem._id;
            self.MenuItem.add(self.newItem).then(function(data){
                self.tmNotifier.notify(data.name + " was successfully added.")
                self.$mdDialog.hide();
                if (nextView === 'details') {
                    self.$state.go('root.menuItemDetail', { id: data._id});
                }
                if (nextView === 'quick') {
                    self.$state.go('root.menuitems');
                }
            });
        });
    }
}

tmDialogMenuItemAdd.$inject = ['$scope', '$dataSource', 'tmNotifier',
     '$state', '$mdDialog', 'tmMongoose'];

export default tmDialogMenuItemAdd;