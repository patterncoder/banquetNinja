import angular from 'angular';
import _ from 'lodash';
import ninjaSchemas from 'ninjaSchemas';



class tmMenuItemDetailCtrl {
    constructor(
        $scope,
        $state,
        tmDetailFactory,
        tmMenuItemDocSvc) {
        var self = this;

        var constructorArgs = {
            $scope: $scope,
            docSvc: tmMenuItemDocSvc,
            schema: ninjaSchemas.production.MenuItem,
            model: "MenuItem",
            listView: "root.menuitems",
            detailView: "root.menuItemDetail",
            addHeaderText: "Add Menu Item"
        };

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

        this.dialogOptions = {
            closeButtonText: 'No',
            actionButtonText: 'Yes',
            headerText: 'Wait!',
            bodyText: 'Delete this item?'
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

        this.loadData().then(function () {
            self.getDetailTitle();
        });

        this.getDetailTitle = function () {
            self.detailTitle = {
                leader: 'Detail for: ',
                text: tmMenuItemDocSvc.doc.name
            };
        };


        this.addTitle = function () {
            console.log('in add title');
            this.docSvc.addTitle(this.newTitle);
            this.newTitle = null;
        };

    }

    // addTitle(item){
    //     console.log('in add title');
    //     this.docSvc.addTitle(this.newTitle);
    //     this.newTitle = null;
    // }

}

tmMenuItemDetailCtrl.$inject = [
    '$scope',
    '$state',
    'tmDetailFactory',
    'tmMenuItemDocSvc'
];

export default tmMenuItemDetailCtrl;
