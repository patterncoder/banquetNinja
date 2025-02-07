import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

import config from 'config';

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


    this.moreFunctions.cloneMenu = {
      label: "Clone Menu",
      method: () => {
        var dialogConfig = {
          template: require('apply!../../../common/tmDialogAddItem.jade'),
          controller: 'tmDialogAddItemCtrl as vm',
          locals: {
              model: 'Menu',
              schema: self.constructorArgs.schema,
              listView: self.constructorArgs.listView,
              detailView: self.constructorArgs.detailView,
              headerText: 'Clone Menu',
              hideCustomerInput: true,
              hideDetailButton: true,
              documentToClone: self.docSvc.getDoc()
          }
        };

        self.tmDialogSvc.showDialog(dialogConfig);
      }
    };

    this.moreFunctions.printMenuHTML = {
      label: "Print HTML",
      method: () => {
        let url = `${config.apiBase}/production/menus/${self.$stateParams.id}/html`;
        window.open(url);
      }
    }

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
                        listView: '', // don't transition away
                        detailView: 'root.menuitems', // root.menuItem
                        headerText: 'Add Menu Item',
                        hideDetailButton: true
                    }
                };
                self.tmDialogSvc.showDialog(dialogConfig).then((item) => {
                    self.docSvc.addMenuItem(self.tabIndex, item)
                    console.log(item);
                });

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


    this.ninjaGridDetailsLink = (item) => {

      // capture jumping to another state from detail...this is needed to prevent circular
      // close button issue...without it will keep bouncing between two details states
      self.$state.data = 'root.menuItemDetail';
      self.$state.go('root.menuItemDetail', { id: item._id });
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