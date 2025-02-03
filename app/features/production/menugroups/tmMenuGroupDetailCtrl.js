
import ninjaSchemas from 'ninjaSchemas';

import mongoose from "mongoose";
import config from 'config';

function tmMenuGroupDetailCtrl (
    $scope,
    $state,
    tmDetailFactory,
    tmMenuGroupDocSvc,
    $http,
    $dataSource
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmMenuGroupDocSvc,
        schema: ninjaSchemas.production.MenuGroup,
        model: "MenuGroup",
        listView: "root.menugroups",
        detailView: "root.menuGroupDetail",
        addHeaderText: "Add Menu Group"
    }
    
    this.__proto__ = tmDetailFactory(constructorArgs);
    this.$dataSource = $dataSource;
    
    this.$scope.$watch(function(){
        return self.docSvc.isDirty();
    }, function(newVal, oldVal,  scope){
        if(newVal){
            self.detailForm.$setDirty();
        } else {
            self.detailForm.$setPristine();
            self.detailForm.$setUntouched();
        }
    });

    /**
     * @description used to toggle the add menu panel and change the button name
     */
    this.toggleMenuSelector = () => {
        this._menuSelectorOpen = !this._menuSelectorOpen;
        this.menuSelectorLabel = this._menuSelectorOpen ? 'Close Menu Selector' : 'Add Menu';
    }

    this.editAssignedMenu = (idVal) => {
      console.log(idVal);
    };


    /**
     * @description standard header title called after loading the document
     */
    this.getDetailTitle = function () {
        self.detailTitle = {
            leader: 'Menu Group Detail: ',
            text: self.docSvc.doc.name
        };
    };

    /**
     * @description gets the menu groups with menu name, title and subtitle populated
     */
    this.loadData({"populate[menus]": { "select": "name title subtitle" }, "populate[groupMenus.menuId]": { "select": "name title subtitle" }}).then(() => {
        this.getDetailTitle();
        this.getMenusForSelector();
    });


    

    this.saveChanges = (saveAndGo) => {
        const urlNames = this.docSvc.doc.groupMenus.map(m => m.referenceName);
        const uniqueUrls = (new Set(urlNames).size) === urlNames.length;
        if(!uniqueUrls) {
          return self.tmNotifier.error("Cannot save a menu group with duplicate menu URLs.");
        }
        this.__proto__.saveChanges(saveAndGo);
    }
    
    this.getMenusForSelector = () => {
        let Menus = this.$dataSource.load("Menu");
        Menus.query({select: 'name'}).then((data) => {
            this.menusForSelector = data;
        });
    }

    this.detailsLink = (idVal) => {

        // capture jumping to another state from detail...this is needed to prevent circular
        // close button issue...without it will keep bouncing between two details states
        self.$state.data = 'root.menuDetail';
        self.$state.go('root.menuDetail', { id: idVal, returnToList: 'true' });
    }

    this.deleteMenu = (item) => {
        this.docSvc.removeMenu(item);
    }

    this.deleteGroupMenu = (item) => {
        this.docSvc.removeGroupMenu(item);
    }


    this.editMenuInGroup = function (index, item) {
        // var itemCopy;
        // if (!item) {
        //     itemCopy = {};
        // } else {
        //     itemCopy = angular.copy(item);
        // }
        var schema = mongoose.Schema({
          referenceName: String,
          notes: String
        })
        var dialogConfig = {
            template: require('apply!./editMenuInGroup.jade'),
            controller: 'tmDialogAddDocPartCtrl as vm',
            locals: {
                schema: schema,
                headerText: 'Edit Menu in Group',
                item: item
            }
        };
        self.tmDialogSvc.showDialog(dialogConfig).then(function (item) {
            
            // self.docSvc.saveChanges().then(function () {
            //     self.docSvc.refreshFromServer();
            // });
        });
    };


    this.addMenu = (item) => {
        let newItem = {
          menuId: { 
            _id: item._id,
            name: item.name
          },
          referenceName: 'Add URL reference',
          notes: ''
        }
        this.docSvc.addMenuToGroup(newItem);
    }


    return this;
}

tmMenuGroupDetailCtrl.$inject = [
    '$scope',
    '$state',
    'tmDetailFactory',
    'tmMenuGroupDocSvc',
    '$http',
    '$dataSource'
];

export default tmMenuGroupDetailCtrl;