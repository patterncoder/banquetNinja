import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

function tmMenuDetailCtrl(
    $scope,
    $state,
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

    console.log("tmMenuDetailCtrl called!");

    this.__proto__ = tmDetailFactory(constructorArgs);

    //close overrides from tmDetailFactory.js
    this.close = () => {
        this.canILeave().then((result) => {
            if (result) {

                let backState = $state.back.fromState.name;

                this.docSvc.clearDocument();
                if (backState && backState != "") {
                    this.$state.go(backState, $state.back.fromParams);
                } else {
                    this.$state.go(constructorArgs.listView);
                }
            }
        });
    };

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

    this.loadData().then(() => {

        console.log("this.docSvc:", this.docSvc);

        this.docSvc.doc.selArr = this.docSvc.doc.sections;
        this.docSvc.doc.selArr.map((obj, index) => {
            if (obj["printOrder"] === undefined) {

                obj.printOrder = index;
            }
        });

        try {
            //this.docSvc.getGroups();
            // this.docSvc.selGroup(); //we want to see if this menu is assigned to a group.

            this.docSvc.findAssignedGroups(); //get all groups this menu is assigned to.
            this.docSvc.getCategories(); //get categories for the add food.

            // this.docSvc.getGroups().done(() => {
            //     console.log("groups done loading");
            // });
        } catch (e) {
            console.log("err:", e);
        }
    });



    return this;

}

tmMenuDetailCtrl.$inject = [
    '$scope',
    '$state',
    '$dataSource',
    'tmDetailFactory',
    'tmMenuDocSvc'
];

export default tmMenuDetailCtrl;