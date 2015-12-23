
class tmMenuItemsCtrl {
    constructor ($dataSource, tmNotifier, tmModalSvc, $state, $timeout) {
        var self = this;
        this.$dataSource = $dataSource;
        this.$state = $state;
        self.tmNotifier = tmNotifier;
        self.loading = false;
        this.tmModalSvc = tmModalSvc;
        this.MenuItem = this.$dataSource.load('MenuItem');
        this.sortOptions = [{ value: "name", text: "Sort by Menu Item Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];
        this.MenuItem.query().then(function(items){
            self.loading = true;
            self.items = items;
            self.loading = false;
            
            
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
    
    details(id){
        this.$state.go('menuItemDetail', {id: id});
    }
    
    deleteMenuItem (id) {
        var self = this;
        this.MenuItem.remove(id).then(function(collection){
            self.tmNotifier.notify('The menu item has been deleted.');
            self.items = collection;
        });
        
        
    }
}

tmMenuItemsCtrl.$inject = ['$dataSource', 'tmNotifier', 'tmModalSvc', '$state', '$timeout'];

export default tmMenuItemsCtrl;