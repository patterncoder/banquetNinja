import {productionSchemas} from 'ninjaSchemas';
import angular from 'angular';

function tmMenuItemDocSvc ($q, $dataSource, tmMongoose){
    
    var doc = {};
    var master = {};
    var validationError = null;
    var MenuItem = $dataSource.load("MenuItem");
    
    
    function loadDocument(id){
        var self = this;
        return MenuItem.getOne(id, true).then(function(data, status){
            self.validationError = null;
            self.doc = data;
            self.master = angular.copy(data);
            return data;
        });
    }
    
    function saveChanges(){
        var self = this;
        var deferred = $q.defer();
        var monDoc = new tmMongoose.Document(self.doc, productionSchemas.menuitem);
        monDoc.validate(function(err){
            if(err){
                console.log(err);
                self.validationError = err;
                deferred.reject('has errors');
                return
            }
            
            MenuItem.update(self.doc).then(function(data){
                
                self.doc = data;
                self.master = angular.copy(data);
                deferred.resolve();
            });
        });
        return deferred.promise;
    }
    
    function isDirty(){
        return !angular.equals(this.master, this.doc);
    }
    
    function clearDocument(){
        this.doc = {};
    }
    
    function undoChanges(){
        var self = this;
        self.doc = angular.copy(self.master);
        self.validationError = null;
        
    }
    
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
    
    function getCategories(){
        return this.doc.categories;
    }
    
    function removeCategory(category){
        var index = this.doc.categories.indexOf(category);
        if (index > -1) {
            this.doc.categories.splice(index, 1);
        }
    }
    
    function removeContactType(contactType){
        var index = this.doc.contactTypes.indexOf(contactType);
        if (index > -1) {
            this.doc.contactTypes.splice(index, 1);
        }
    }
    
    return {
        loadDocument: loadDocument,
        clearDocument: clearDocument,
        undoChanges: undoChanges,
        saveChanges: saveChanges,
        addCategory: addCategory,
        getCategories: getCategories,
        removeCategory: removeCategory,
        addContactType: addContactType,
        removeContactType: removeContactType,
        isDirty: isDirty,
        doc: doc
    }
}


tmMenuItemDocSvc.$inject = ['$q', '$dataSource', 'tmMongoose'];

export default tmMenuItemDocSvc;

