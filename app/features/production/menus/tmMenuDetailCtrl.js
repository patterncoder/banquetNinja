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
    this.$dataSource = $dataSource;

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

    this.toggleAddMenuItems = false;

    this.loadData().then(() => {});

    this.createNewMenuItem = () => {
        var self = this;
        this.canILeave().then(function (canILeave) {
            if (canILeave) {
                var dialogConfig = {
                    template: require('apply!../../../common/tmDialogAddItem.jade'),
                    controller: 'tmDialogAddItemCtrl as vm',
                    locals: {
                        model: 'MenuItem',
                        schema: ninjaSchemas.production.MenuItem,
                        listView: '',
                        detailView: '',
                        headerText: 'Add Menu Item'
                    }
                };
                self.tmDialogSvc.showDialog(dialogConfig);

            }
        });
    };


    this.addMenuSection = () => {
        this.docSvc.doc.sections.push({
            title: 'New Section',
            subtitle: '',
            footer: null,
            items: []
        });
        this.tabIndex++;
    }

    this.searchForMenuItems = (titleLike, descriptionLike, categoryIs) => {
        let menuItemsResource = self.$dataSource.load("MenuItem");
        if (!titleLike && !descriptionLike && !categoryIs) {
            console.log('will not search without at least one param');
            return;
        }
        menuItemsResource.query({
            select: 'name title description',
            "like[name]": titleLike,
            "like[description]": descriptionLike,
            "in[categories]": categoryIs
        }, true, true).then((data) => {
            console.log(data);
            self.selectableMenuItems = data;
        });
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