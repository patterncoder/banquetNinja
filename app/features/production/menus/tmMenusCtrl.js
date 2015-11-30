

class tmMenusCtrl {
    constructor($dataSource){
        var vm = this;
        vm.$dataSource = $dataSource;
        vm.test = "this is test";
        var Menu = vm.$dataSource.load('Menu');
        Menu.query().then(function(items){
            vm.items = items;
        });
    }
}

tmMenusCtrl.$inject = ['$dataSource'];

export default tmMenusCtrl;