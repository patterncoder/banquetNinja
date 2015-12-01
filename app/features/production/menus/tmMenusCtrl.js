

class tmMenusCtrl {
    constructor($dataSource){
        var self = this;
        this.$dataSource = $dataSource;
        this.test = "this is test";
        var Menu = this.$dataSource.load('Menu');
        Menu.query().then(function(items){
            self.items = items;
        });
    }
}

tmMenusCtrl.$inject = ['$dataSource'];

export default tmMenusCtrl;