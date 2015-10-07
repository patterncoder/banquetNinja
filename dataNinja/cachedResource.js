

// CachedResource is registerd as a factory in the dataNinja module and 
// used via DI in the $dataSource provider
// $resourc is passed in from the 
import angular from 'angular';


export default class CachedResource {
    constructor ($resource, $q, definition) {
        this.List;
        this.$q = $q;
        
        this.Resource = new $resource(definition.url, definition.defaults, definition.methods);
        // extend resource if has extentions.
        if(definition.extensions){
            for (var i = 0; i < definition.extensions.length; i++){
                this.Resource.prototype[definition.extensions[i].key] = definition.extensions[i].method;
            }
        }
        
    }
    
    query (queryString) {
        var deferred = this.$q.defer();
                var self = this;
                
                if (!self.List) {
                    self.Resource.query(function(data){
                        self.List = data;
                        deferred.resolve(self.List);
                    });
                    
                }
                else {
                    deferred.resolve(self.List);
                }
                
                return deferred.promise;
    }
    
    getOne (id,fullDocumentFromDb){
                
                var deferred = this.$q.defer();
                var self = this;
                if (!self.List){
                    // this case is pretty rare...it requires putting in a details url with a record
                    // id so we have to first populate the the full list then get the full record of the detail
                    self.Resource.query(function(data){
                        self.List = data;
                        self.Resource.get({_id: id}, function (data) {
                    
                            var itemIndex = self.List.map(function (i) {
                                return i._id;
                                }).indexOf(id);
                            self.List[itemIndex] = data;
                            deferred.resolve(data);
                        });
                        
                    });
                    // self.Resource.get({_id: id}, function(data){
                    //     self.List = data;
                    //     console.log(data);
                    //     deferred.resolve(data);
                        
                    // });
                } 
                else {
                    if (fullDocumentFromDb){
                        self.Resource.get({_id: id}, function (data) {
                    
                            var itemIndex = self.List.map(function (i) {
                                return i._id;
                                }).indexOf(id);
                            self.List[itemIndex] = data;
                            var dataCopy = angular.copy(data);
                            deferred.resolve(dataCopy);
                            
                        });
                    }
                    else {
                        self.List.forEach(function (item) {
                        if (item._id === id) {
                            deferred.resolve(item);
                        }});
                    }
                }
                
                
                
                return deferred.promise;
                
                
    }
    
    update (item) {
                //put revised object back in the cache
                var self = this;
                var itemIndex = self.List.map(function (i) {
                                return i._id;
                                }).indexOf(item._id);
                self.List[itemIndex] = item;
                delete item.$resolved;
                var promise = this.Resource.update({ _id: item._id }, item).$promise;
                console.log(self.List);
                return promise;
    }
    
    remove (id) {
                
                var self = this;
                var deferred = this.$q.defer();
                
                this.Resource.remove({ _id: id }, function () {
                    var item = self.List.map(function (i) {
                        return i._id;
                    }).indexOf(id);
                    self.List.splice(item, 1);
                    
                    deferred.resolve(self.List);

                });
                
                return deferred.promise;
                

    }
    
    add (item) {
                var newItem = new this.Resource(item);
                var self = this;
                var promise = newItem.$save(function (i) { self.List.push(i); });

                return promise;
    }
    
    clear () {
                this.List = undefined;

    }
    
    
    
    
}