import angular from  'angular';
import _ from 'lodash';

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
    
    function convertDateStrings(data){
        var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        _.forIn(data, function(value, key) {
                //console.log(key);
                if (typeof value === 'string') {
                    var a = reISO.exec(value);
                    if (a) {
                        data[key] = new Date(value);
                    }
                }
            });
        return data;
    }
    
    this.loadDocument = function (id){
        var self = this;
        console.log('in load doc');
        return this.docModel.getOne(id, true).then(function(data, status){
            data = convertDateStrings(data);
            self.validationError = null;
            console.log(data);
            console.log(status);
            self.doc = data;
            self.master = angular.copy(data);
            return data;
        }, function(error){
            console.log(error);
            return(error);
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
                data = convertDateStrings(data);
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

