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

  
    return this;

}


tmRecipeDocSvc.$inject = ['tmDocFactory', '$dataSource'];

export default tmRecipeDocSvc;