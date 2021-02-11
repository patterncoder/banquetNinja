
import angular from 'angular';

function tmBaseDocSvc ($dataSource, tmMongoose, $q, model, schema){
    
    // instance vars
    var doc = {};
    var master = {};
    var validationError = null;
    
    // Set data source model item here
    //var docModel;
    var docModel = $dataSource.load(model);
    // set mongoose schema here
    var docSchema = schema;
    
    
    
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
    
    
    return {
        // standard doc api
        doc: doc,
        loadDocument: loadDocument,
        clearDocument: clearDocument,
        undoChanges: undoChanges,
        saveChanges: saveChanges,
        isDirty: isDirty,
        refreshFromServer: refreshFromServer
    }
}

//tmBaseDocSvc.$inject = ['$q', '$dataSource', 'tmMongoose'];

export default tmBaseDocSvc;

