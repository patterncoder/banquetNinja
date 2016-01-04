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
        this.fields = [
            {
                name: 'name',
                label: 'Menu Name',
                value: '',
                required: true
            },
            {
                name: 'title',
                label: 'Menu Title',
                value: '',
                required: true
            },
            {
                name: 'description',
                label: 'Menu Description',
                value: '',
                required: false
            }
        ];
        
    }
    
    cancel () {
        this.$mdDialog.cancel();
    }
    
    addItem (nextView) {
        var self = this;
        var newMenu = {};
        for(var i = 0; i < this.fields.length; i++)
        {
            newMenu[this.fields[i].name] = this.fields[i].value;
        }
        
        this.MenuItem.add(newMenu).then(function(data){
                self.tmNotifier.notify(data.title + " was successfully added.")
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