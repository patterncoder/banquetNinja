import {productionSchemas} from 'ninjaSchemas';

class tmModalMenuItemAdd {
    constructor($dataSource, tmNotifier,
        $modalInstance, $modal, $state){
        
        this.getFields();
        this.$modalInstance = $modalInstance;
        this.$dataSource = $dataSource;
        this.tmNotifier = tmNotifier;
        this.$state = $state;
        this.MenuItem = this.$dataSource.load('MenuItem');
        this.modalOptions = {
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
        this.$modalInstance.dismiss();
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
                self.$modalInstance.dismiss();
                if (nextView === 'details') {
                    self.$state.go('root.menuItemDetail', { id: data._id});
                }
        });
    }
}

tmModalMenuItemAdd.$inject = ['$dataSource', 'tmNotifier',
    '$modalInstance', '$modal', '$state'];

export default tmModalMenuItemAdd;