

class tmMenuGroupsCtrl {
    constructor ($dataSource) {
        var vm = this;
        vm.$dataSource = $dataSource;
        vm.title = "hello";
        vm.subTitle = "whats up";
        var MenuGroup = vm.$dataSource.load('MenuGroup');
        MenuGroup.query().then(function(items){
            vm.items = items;
        });
    }
}

tmMenuGroupsCtrl.$inject = ['$dataSource'];

export default tmMenuGroupsCtrl;