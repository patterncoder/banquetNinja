import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmMenuItemDocSvc (tmDocFactory){
    
    var baseDoc = tmDocFactory('MenuItem', ninjaSchemas.production.MenuItem);
    
    
    function addContactType(contactType){
        var index = this.doc.contactTypes.indexOf(contactType);
        if(index === -1){
            this.doc.contactTypes.push(contactType);
        } else {
            throw new Error("Contact Type alread exists");
        }
    }
    
    function addCategory(category){
        var index = this.doc.categories.indexOf(category);
        if (index === -1) {
            this.doc.categories.push(category);
            return this.doc.categories;
        } else {
            throw new Error("Category already exists");
        }
    }
    
    function addTitle(title){
        var index = this.doc.title.indexOf(title)
        if (index === -1) {
            this.doc.title.push(title);
            return;
        } else {
            throw new Error("Title already exists");
        }
    }
    
    function removeTitle(title){
        var index = this.doc.title.indexOf(title);
        if (index > -1) {
            this.doc.title.splice(index, 1);
        }
    }
    
    function getCategories(){
        return this.doc.categories;
    }
    
    function removeCategory(category){
        var index = this.doc.categories.indexOf(category);
        if (index > -1) {
            this.doc.categories.splice(index, 1);
        }
    }
    
    
    
    var menuItemDocSvc = {
        addCategory: addCategory,
        getCategories: getCategories,
        removeCategory: removeCategory,
        addTitle: addTitle,
        removeTitle: removeTitle
    };
    
    menuItemDocSvc.__proto__ = baseDoc;
    
    return  menuItemDocSvc;
    
}

tmMenuItemDocSvc.$inject = ['tmDocFactory'];

export default tmMenuItemDocSvc;

