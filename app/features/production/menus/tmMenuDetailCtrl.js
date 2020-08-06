import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmMenuDetailCtrl(
    $scope,
    $dataSource,
    tmDetailFactory,
    tmMenuDocSvc
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        $dataSource: $dataSource,
        docSvc: tmMenuDocSvc,
        schema: ninjaSchemas.production.Menu,
        model: "Menu",
        listView: "root.menus",
        detailView: "root.menuDetail",
        addHeaderText: "Add Menu"
    }

    this.__proto__ = tmDetailFactory(constructorArgs);

    this.$scope.$watch(function () {
        return self.docSvc.isDirty();
    }, function (newVal, oldVal, scope) {
        if (newVal) {
            self.detailForm.$setDirty();
        } else {
            self.detailForm.$setPristine();
            self.detailForm.$setUntouched();
        }
    });


    this.loadData();

    console.log(this.docSvc);

    try {
        //this.docSvc.getGroups();
        this.docSvc.selGroup(); //we want to see if this menu is assigned to a group.
        // this.docSvc.getGroups().done(() => {
        //     console.log("groups done loading");
        // });
    } catch (e) {
        console.log("err:", e);
    }


    return this;

}

tmMenuDetailCtrl.$inject = [
    '$scope',
    '$dataSource',
    'tmDetailFactory',
    'tmMenuDocSvc'
];

export default tmMenuDetailCtrl;