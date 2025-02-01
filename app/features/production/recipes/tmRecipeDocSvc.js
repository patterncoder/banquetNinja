import ninjaSchemas from 'ninjaSchemas';

function tmRecipeDocSvc(tmDocFactory, $dataSource) {

    this.__proto__ = tmDocFactory('Recipe', ninjaSchemas.production.Recipe);
    this.reloadPopulatedDocAfterSave = true;


    this.addCategory = function (category) {
        console.log(category);
        this.doc.categories = this.doc.categories || [];
        var index = this.doc.categories.indexOf(category);
        console.log(this.doc.categories);
        if (index === -1) {
            this.doc.categories.push(category);
            return this.doc.categories;
        } else {
            return;
        }
    }
  
    this.removeCategory = function (category) {
        var index = this.doc.categories.indexOf(category);
        if (index > -1) {
            this.doc.categories.splice(index, 1);
        }
    }


    this.addStation = function (station) {
      this.doc.stations = this.doc.stations || [];
      var index = this.doc.stations.indexOf(station);
      if (index === -1) {
          this.doc.stations.push(station);
          return this.doc.stations;
      } else {
          return;
      }
  }

  this.removeStation = function (station) {
      var index = this.doc.stations.indexOf(station);
      if (index > -1) {
          this.doc.stations.splice(index, 1);
      }
  }

  this.addIngredient = (ingredient) => {
    const newIng = {
      quantity: 0,
      unit: null,
      name: ingredient.name,
      ingredientId: ingredient._id,
      prepNotes: ''
    }
    this.doc.ingredients.push(newIng);
  };


  this.removeIngredient = (indx) => {
    this.doc.ingredients.splice(indx, 1);
  };

  this.addRecipe = (recipe) => {
    const newRec = {
      quantity: 0,
      unit: null,
      name: recipe.name,
      recipeId: recipe._id,
      prepNotes: ''
    }
    this.doc.recipes.push(newRec);
  };


  this.removeRecipe = (indx) => {
    this.doc.recipes.splice(indx, 1);
  };
  
  return this;

}


tmRecipeDocSvc.$inject = ['tmDocFactory', '$dataSource'];

export default tmRecipeDocSvc;