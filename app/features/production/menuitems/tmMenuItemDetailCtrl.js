import angular from 'angular';
import _ from 'lodash';
import ninjaSchemas from 'ninjaSchemas';



class tmMenuItemDetailCtrl {
    constructor(

        $scope,
        tmDetailFactory,
        tmMenuItemDocSvc,
        $dataSource) {
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
        this.$dataSource = $dataSource;

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

        this.openSizesPanel = () => {
            this.openPanel('sizesPanel');
        }


        this.panels = {
            cateoryPanel: false,
            sizesPanel: false
        }

        this.openPanel = (panelToOpen) => {
          this.closePanels();
          this.panels[panelToOpen] = true;
        }
    
        this.closePanels = () => {
          Object.keys(this.panels).forEach((panel) => {
            this.panels[panel] = false;
          });
        };


        this.addTitle = function () {
            this.docSvc.addTitle(this.newTitle);
            this.newTitle = null;
        };


        this.searchForRecipes = (nameLike, categoryLike) => {
            if(!nameLike && !categoryLike) return;
            let recipesResource = this.$dataSource.load("Recipe");
            recipesResource.query({
            select: 'name categories',
            "like[name]": nameLike,
            "like[categories]": categoryLike,
            "andIn[categories]": 'Menu Item'
            }, true, true).then((data) => {
            console.log(data);
            self.selectableRecipes = data; 
            });
        };

        }


}

tmMenuItemDetailCtrl.$inject = [

    '$scope',
    'tmDetailFactory',
    'tmMenuItemDocSvc',
    '$dataSource'
];

export default tmMenuItemDetailCtrl;
