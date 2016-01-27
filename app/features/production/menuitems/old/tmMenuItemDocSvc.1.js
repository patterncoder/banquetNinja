import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmMenuItemDocSvc ($q, $dataSource, tmMongoose){
    
    // instance vars
    var doc = {};
    var master = {};
    var validationError = null;
    // Set data source model item here
    var docModel = $dataSource.load("MenuItem");
    // set mongoose schema here
    var docSchema = ninjaSchemas.production.MenuItem;
    
    
    function loadDocument(id){
        var self = this;
        return docModel.getOne(id, true).then(function(data, status){
            self.validationError = null;
            self.doc = data;
            self.master = angular.copy(data);
            return data;
        });
    }
    
    function refreshFromServer(){
        this.loadDocument(this.doc._id);
    }
    
    function saveChanges(){
        var self = this;
        var deferred = $q.defer();
        var monDoc = new tmMongoose.Document(self.doc, docSchema);
        monDoc.validate(function(err){
            if(err){
                console.log(err);
                self.validationError = err;
                deferred.reject('has errors');
                return
            }
            docModel.update(self.doc).then(function(data){
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
    
    // Doc specific methods
    
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
    
    return {
        // standard doc api
        doc: doc,
        loadDocument: loadDocument,
        clearDocument: clearDocument,
        undoChanges: undoChanges,
        saveChanges: saveChanges,
        isDirty: isDirty,
        refreshFromServer: refreshFromServer,
        
        // doc specific api
        addCategory: addCategory,
        getCategories: getCategories,
        removeCategory: removeCategory,
        addTitle: addTitle,
        removeTitle: removeTitle
    }
}

tmMenuItemDocSvc.$inject = ['$q', '$dataSource', 'tmMongoose'];

export default tmMenuItemDocSvc;

