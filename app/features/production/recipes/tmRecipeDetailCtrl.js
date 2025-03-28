import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';
import config from 'config';

function tmRecipeDetailCtrl(
    $scope,
    $dataSource,
    tmDetailFactory,
    tmRecipeDocSvc
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        $dataSource: $dataSource,
        docSvc: tmRecipeDocSvc,
        schema: ninjaSchemas.production.Recipe,
        model: "Recipe",
        listView: "root.recipes",
        detailView: "root.recipeDetail",
        addHeaderText: "Add Recipe"
    }

    this.__proto__ = tmDetailFactory(constructorArgs);
    this.$dataSource = $dataSource;


    this.getDetailTitle = function () {
      self.detailTitle = {
          leader: 'Recipe Detail: ',
          text: self.docSvc.doc.name
      };
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


    this.moreFunctions.pdf = {
        label: "Print Recipe",
        method: function () {
            let openPDF = () => {
                let url = `${config.apiBase}/production/recipes/${self.$stateParams.id}/view/pdf`;
                var req = {
                    method: 'GET',
                    url: url,
                    responseType: 'arraybuffer'
                };
                self.$http(req).then(function (result) {
                    var file = new Blob([result.data], { type: 'application/pdf' });
                    var fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                });
            };

            //lets save the contract before trying to print it!
            self.setLoading(true);
            self.docSvc.saveChanges().then(() => {
                openPDF();
                self.setLoading(false);
            }, (err) => {
                self.tmNotifier.error("There was a problem with saving...");
                self.setLoading(false);
            });
        }
    };

    this.ninjaGridDetailsLink = (item) => {

      // capture jumping to another state from detail...this is needed to prevent circular
      // close button issue...without it will keep bouncing between two details states
      self.$state.data = 'root.recipeDetail';
      self.$state.routeStack = self.$state.routeStack || [];
      self.$state.routeStack.push({
        to: self.$state.to,
        from: self.$state.from});
      self.$state.go('root.recipeDetail', { id: item.recipeId, returnToList: 'false' });
    }

    this.panels = {
      cateoryPanel: false,
      stationPanel: false,
      ingredientPanel: false,
      recipePanel: false
    }

    this.openIngredientPanel = () => {
      this.openPanel('ingredientPanel');
    }
    this.openRecipePanel = () => {
      this.openPanel('recipePanel');
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

    this.addNewCategory = (categoryName) => {
      if (!categoryName) return;
      this.docSvc.addCategory(categoryName);
      this.$scope.nameLike = null;
    };

    this.addNewStation = (newStationName) => {
      if (!newStationName) return;
      this.docSvc.addStation(newStationName);
      this.$scope.newStationName = null;
    };

    this.searchForIngredients = (nameLike, categoryLike) => {
      if(!nameLike && !categoryLike) return;
      let ingredientsResource = self.$dataSource.load("Ingredient");
      ingredientsResource.query({
        select: 'name categories',
        "like[name]": nameLike,
        "like[categories]": categoryLike
      }, true, true).then((data) => {
        console.log(data);
        self.selectableIngredients = data; 
      });
    };


    this.searchForRecipes = (nameLike, categoryLike) => {
      if(!nameLike && !categoryLike) return;
      let recipesResource = self.$dataSource.load("Recipe");
      recipesResource.query({
        select: 'name categories',
        "like[name]": nameLike,
        "like[categories]": categoryLike
      }, true, true).then((data) => {
        console.log(data);
        self.selectableRecipes = data; 
      });
    };

    this.unitOptions = [];
    this.loadUnits = () => {
      
      let unitsResource = self.$dataSource.load("Unit");
      unitsResource.query({select: 'name', "sort[name]": 1}, true, true)
        .then((data) => {
          this.unitOptions = data.map(u => u.name);
        });
    };
    this.loadUnits();



    this.loadData().then(() => {});


    return this;

}

tmRecipeDetailCtrl.$inject = [
    '$scope',
    '$dataSource',
    'tmDetailFactory',
    'tmRecipeDocSvc'
];

export default tmRecipeDetailCtrl;