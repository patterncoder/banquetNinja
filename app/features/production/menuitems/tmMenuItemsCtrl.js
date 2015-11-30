
class tmMenuItemsCtrl {
    constructor ($dataSource) {
        var vm = this;
        vm.$dataSource = $dataSource;
        var MenuItem = vm.$dataSource.load('MenuItem');
        MenuItem.query().then(function(items){
            vm.items = items;
        });
        vm.test = "hello there from tmMenuItemsCtrl";
    }
}

tmMenuItemsCtrl.$inject = ['$dataSource'];

export default tmMenuItemsCtrl;