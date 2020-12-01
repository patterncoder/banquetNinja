import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmMenuItemDocSvc (tmDocFactory){
    
    this.__proto__ = tmDocFactory('MenuItem', ninjaSchemas.production.MenuItem);
    
    
    this.addContactType = function (contactType){
        var index = this.doc.contactTypes.indexOf(contactType);
        if(index === -1){
            this.doc.contactTypes.push(contactType);
        } else {
            throw new Error("Contact Type alread exists");
        }
    }
    
    this.addCategory = function (category){
        this.doc.categories = this.doc.categories ? this.doc.categories : []; //make sure we don't have an undefined...
        var index = this.doc.categories.indexOf(category);
        if (index === -1) {
            this.doc.categories.push(category);
            return this.doc.categories;
        } else {
            throw new Error("Category already exists");
        }
    }
    
    this.addTitle = function (title){
        var index = this.doc.title.indexOf(title)
        if (index === -1) {
            this.doc.title = title;
            //this.doc.title.push(title);
            return;
        } else {
            throw new Error("Title already exists");
        }
    }
    
    this.removeTitle = function (title){
        var index = this.doc.title.indexOf(title);
        if (index > -1) {
            this.doc.title.splice(index, 1);
        }
    }
    
    this.getCategories = function (){
        return this.doc.categories;
    }
    
    this.removeCategory = function (category){
        var index = this.doc.categories.indexOf(category);
        if (index > -1) {
            this.doc.categories.splice(index, 1);
        }
    }
    
    
    
    
    return this;
    
}

tmMenuItemDocSvc.$inject = ['tmDocFactory'];

export default tmMenuItemDocSvc;

