import angular from  'angular';

function tmDocFactory ($dataSource, tmMongoose, $q) {
    return function(model, schema) {
        return new BaseDocService($dataSource, tmMongoose, $q, model, schema);
    }
}

tmDocFactory.$inject = ['$dataSource', 'tmMongoose', '$q'];

export default tmDocFactory;



function BaseDocService ($dataSource, tmMongoose, $q, model, schema){
    
    // instance vars
    this.doc = {};
    this.master = {};
    this.validationError = null;
    this.tmMongoose = tmMongoose;
    this.$q = $q;
    // Set data source model item here
    //var docModel;
    this.docModel = $dataSource.load(model);
    // set mongoose schema here
    this.docSchema = schema;
    
    
    
    this.loadDocument = function (id){
        var self = this;
        return this.docModel.getOne(id, true).then(function(data, status){
            self.validationError = null;
            self.doc = data;
            self.master = angular.copy(data);
            return data;
        });
    }
    
    this.refreshFromServer = function (){
        this.loadDocument(this.doc._id);
    }
    
    this.saveChanges = function (){
        var self = this;
        var deferred = $q.defer();
        var monDoc = new tmMongoose.Document(self.doc, self.docSchema);
        monDoc.validate(function(err){
            if(err){
                console.log(err);
                self.validationError = err;
                console.log(self.validationError);
                deferred.reject('base doc service has errors');
                return
            }
            self.docModel.update(self.doc).then(function(data){
                self.doc = data;
                self.master = angular.copy(data);
                deferred.resolve();
            }, function(err){
                deferred.reject(err);
                return;
            });
        });
        return deferred.promise;
    }
    
    this.isDirty = function (){
        return !angular.equals(this.master, this.doc);
    }
    
    this.clearDocument = function (){
        this.doc = {};
    }
    
    this.undoChanges = function (){
        var self = this;
        self.doc = angular.copy(self.master);
        self.validationError = null;
    }
    
    
}

