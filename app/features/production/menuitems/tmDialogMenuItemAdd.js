import {productionSchemas} from 'ninjaSchemas';

class tmDialogMenuItemAdd {
    constructor($dataSource, tmNotifier, $state, $mdDialog){
        
        this.$mdDialog = $mdDialog;
        this.$dataSource = $dataSource;
        this.tmNotifier = tmNotifier;
        this.$state = $state;
        this.MenuItem = this.$dataSource.load('MenuItem');
        this.dialogOptions = {
            headerText: "Add Menu Item"
        };
        this.newItem = {};
        this.fields = [];
        this.getFields();
        
    }
    
    cancel () {
        this.$mdDialog.cancel();
    }
    
    
    
    getFields() {
        
        for(var k in productionSchemas.menuitem.paths) {
            if(productionSchemas.menuitem.paths.hasOwnProperty(k) && productionSchemas.menuitem.paths[k].isRequired){
                
                this.fields.push(productionSchemas.menuitem.paths[k]);
                this.newItem[k] = null;
            }
        }
    }
    
    addItem (nextView) {
        var self = this;
        // var newMenu = {};
        // for(var i = 0; i < this.fields.length; i++)
        // {
        //     newMenu[this.fields[i].name] = this.fields[i].value;
        // }
        
        this.MenuItem.add(this.newItem).then(function(data){
                self.tmNotifier.notify(data.name + " was successfully added.")
                self.$mdDialog.hide();
                if (nextView === 'details') {
                    self.$state.go('root.menuItemDetail', { id: data._id});
                }
        });
    }
}

tmDialogMenuItemAdd.$inject = ['$dataSource', 'tmNotifier',
     '$state', '$mdDialog'];

export default tmDialogMenuItemAdd;