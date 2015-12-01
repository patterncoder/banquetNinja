
class tmMenuItemsCtrl {
    constructor ($dataSource, tmNotifier, tmModalSvc) {
        var self = this;
        this.$dataSource = $dataSource;
        self.tmNotifier = tmNotifier;
        this.tmModalSvc = tmModalSvc;
        this.MenuItem = this.$dataSource.load('MenuItem');
        this.sortOptions = [{ value: "menuItemName", text: "Sort by Menu Item Name" }, { value: "menuItemDateCreate", text: "Sort by Date Created" }];
        this.MenuItem.query().then(function(items){
            self.items = items;
        });
        this.test = "hello there from tmMenuItemsCtrl";
    }
    
    addItem(){
        var modalConfig = {
            template: require('apply!../../../common/tmModalAddItem.jade'),
            controller: 'tmModalMenuItemAdd as vm'
        };
        this.tmModalSvc.showModal(modalConfig);
    }
    
    deleteMenuItem (id) {
        var self = this;
        this.MenuItem.remove(id).then(function(collection){
            self.tmNotifier.notify('The menu item has been deleted.');
            self.items = collection;
        });
        
        
    }
}

tmMenuItemsCtrl.$inject = ['$dataSource', 'tmNotifier', 'tmModalSvc' ];

export default tmMenuItemsCtrl;