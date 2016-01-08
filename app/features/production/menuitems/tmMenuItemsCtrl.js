
class tmMenuItemsCtrl {
    constructor ($dataSource, tmNotifier, tmDialogSvc, $state) {
        //injected dependencies
        this.$dataSource = $dataSource;
        this.$state = $state;
        this.tmNotifier = tmNotifier;
        this.tmDialogSvc = tmDialogSvc
        // local vars
        this.loading = false;
        this.isLoading = false;
        this.sortOptions = [{ value: "name", text: "Sort by Menu Item Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];
        // initialize
        this.loadData();
        
    }
    
    setLoading (loading) {
        this.isLoading = loading;
    }
    
    loadData () {
        var self = this;
        this.setLoading(true);
        //this.tmNotifier.waiting('loading data...');
        this.MenuItem = this.$dataSource.load('MenuItem');
        this.MenuItem.query().then(function(items){
            self.setLoading(false);
            self.items = items;
        });
    }
    
    addItem(){
        var modalConfig = {
            template: require('apply!../../../common/tmModalAddItem.jade'),
            controller: 'tmModalMenuItemAdd as vm'
        };
        this.tmModalSvc.showModal(modalConfig);
    }
    
    addItemDialog(){
        var dialogConfig = {
            template: require('apply!../../../common/tmDialogAddItem.jade'),
            controller: 'tmDialogMenuItemAdd as vm',
            headerText: 'Add Menu Item'
        };
        this.tmDialogSvc.showDialog(dialogConfig);
    }
    
    details(id){
        this.$state.go('root.menuItemDetail', {id: id});
    }
    
    deleteMenuItem (id) {
        var self = this;
        this.MenuItem.remove(id).then(function(collection){
            self.tmNotifier.notify('The menu item has been deleted.');
            self.items = collection;
        });
        
        
    }
}

tmMenuItemsCtrl.$inject = ['$dataSource', 'tmNotifier', 'tmDialogSvc', '$state'];

export default tmMenuItemsCtrl;