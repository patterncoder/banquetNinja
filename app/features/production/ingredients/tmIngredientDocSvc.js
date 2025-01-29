import ninjaSchemas from 'ninjaSchemas';

function tmIngredientDocSvc(tmDocFactory, $dataSource) {

    this.__proto__ = tmDocFactory('Ingredient', ninjaSchemas.production.Ingredient);
    this.reloadPopulatedDocAfterSave = true;
  
    return this;

}


tmIngredientDocSvc.$inject = ['tmDocFactory', '$dataSource'];

export default tmIngredientDocSvc;