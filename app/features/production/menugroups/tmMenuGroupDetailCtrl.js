
import ninjaSchemas from 'ninjaSchemas';
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

    /**
     * @description sets the menugroup to active
     */
    this.setActive = () => {
        let req = {
            method: "PUT",
            url: `${config.apiBase}/production/menugroups/active/${this.$stateParams.id}`
        };
        this.$http(req).then((response) => {
            if(response.status == 200) {
            }
        });
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
    this.loadData({"populate[menus]": '{"select":"name title subtitle"}'}).then(() => {
        this.getDetailTitle();
        this.getMenusForSelector();
    });


    

    this.saveChanges = (saveAndGo) => {
        this.__proto__.saveChanges(saveAndGo);
    }
    
    this.getMenusForSelector = () => {
        let Menus = this.$dataSource.load("Menu");
        Menus.query({select: 'name'}).then((data) => {
            this.menusForSelector = data;
        });
    }

    this.detailsLink = (item) => {

        // capture jumping to another state from detail...this is needed to prevent circular
        // close button issue...without it will keep bouncing between two details states
        self.$state.data = 'root.menuDetail';
        self.$state.go('root.menuDetail', { id: item._id, returnToList: 'true' });
    }

    this.deleteMenu = (item) => {
        this.docSvc.removeMenu(item);
    }

    this.addMenu = (item) => {
        this.docSvc.addMenu(item);
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