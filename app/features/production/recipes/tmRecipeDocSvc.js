import ninjaSchemas from 'ninjaSchemas';

function tmRecipeDocSvc(tmDocFactory, $dataSource) {

    this.__proto__ = tmDocFactory('Recipe', ninjaSchemas.production.Recipe);
    this.reloadPopulatedDocAfterSave = true;
  
    return this;

}


tmRecipeDocSvc.$inject = ['tmDocFactory', '$dataSource'];

export default tmRecipeDocSvc;