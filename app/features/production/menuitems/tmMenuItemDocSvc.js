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
            var tempId = data._id;
            self.doc = new tmMongoose.Document(data, productionSchemas.menuitem);
            self.doc._id.id = tempId;
            self.master = angular.copy(data);
            return data;
        });
    }
    
    function saveChanges(){
        var self = this;
        var deferred = $q.defer();
        self.doc.validate(function(err){
            if(err){
                console.log(err);
                self.validationError = err;
                deferred.reject('has errors');
                return
            }
            var updatedObject = self.doc.toObject();
            MenuItem.update(updatedObject).then(function(data){
                self.doc = null;
                self.doc = new tmMongoose.Document(data, productionSchemas.menuitem);
                var tempId = data._id;
                self.doc._id.id = tempId;
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
        self.doc = new tmMongoose.Document(self.master, productionSchemas.menuitem);
        self.validationError = null;
        
    }
    
    return {
        loadDocument: loadDocument,
        clearDocument: clearDocument,
        undoChanges: undoChanges,
        saveChanges: saveChanges,
        isDirty: isDirty,
        doc: doc
    }
}


tmMenuItemDocSvc.$inject = ['$q', '$dataSource', 'tmMongoose'];

export default tmMenuItemDocSvc;

