import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';

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