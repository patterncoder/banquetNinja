import ninjaSchemas from 'ninjaSchemas';

function tmUnitDocSvc(tmDocFactory, $dataSource) {

    this.__proto__ = tmDocFactory('Unit', ninjaSchemas.production.Unit);
    this.reloadPopulatedDocAfterSave = true;
  
    return this;

}


tmUnitDocSvc.$inject = ['tmDocFactory', '$dataSource'];

export default tmUnitDocSvc;