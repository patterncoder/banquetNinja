

// CachedResource is registerd as a factory in the dataNinja module and 
// used via DI in the $dataSource provider
// $resourc is passed in from the 
import angular from 'angular';


export default class CachedResource {
    constructor($resource, $q, definition) {
        this.List;
        this.$q = $q;

        this.Resource = new $resource(definition.url, definition.defaults, definition.methods);
        // extend resource if has extentions.
        if (definition.extensions) {
            for (var i = 0; i < definition.extensions.length; i++) {
                this.Resource.prototype[definition.extensions[i].key] = definition.extensions[i].method;
            }
        }

    }





    query(queryString, flush) {
        var deferred = this.$q.defer();
        var jsonMSDateTime = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        function jsonReviver(key, value) {
            if (jsonMSDateTime.test(value)) return new Date(value);
            else return value;
        }
        queryString = queryString || {};
        var self = this;
        if (flush) {
            self.List = null;
        }
        if (!self.List) {
            self.Resource.query(queryString, function (data) {
                var json = JSON.stringify(data.data);
                var jsonParsed = JSON.parse(json, jsonReviver);
                //self.convertDateStrings(data);
                self.List = jsonParsed;
                deferred.resolve(self.List);
            });

        }
        else {
            deferred.resolve(self.List);
        }

        return deferred.promise;
    }

    getOne(id, fullDocumentFromDb) {
        var deferred = this.$q.defer();
        var self = this;
        var jsonMSDateTime = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        function jsonReviver(key, value) {
            if (jsonMSDateTime.test(value)) return new Date(value);
            else return value;
        }
        if (!self.List) {
            // this case is pretty rare...it requires putting in a details url with a record
            // id so we have to first populate the the full list then get the full record of the detail
            self.Resource.query(function (data) {
                
                var json = JSON.stringify(data.data);
                var parsedJson = JSON.parse(json, jsonReviver);
                self.List = parsedJson;
                self.Resource.get({ _id: id }, function (response) {
                    var itemIndex = self.List.map(function (i) {
                        return i._id;
                    }).indexOf(id);
                    var json2 = JSON.stringify(response.data);
                    var parsedJson2 = JSON.parse(json2, jsonReviver);
                    self.List[itemIndex] = parsedJson2;
                    var dataCopy = angular.copy(parsedJson2);
                    deferred.resolve(dataCopy);
                }, function (error) {
                    console.log(error);
                    console.log('in reject');
                    deferred.reject(error);
                });

            });
        }
        else {
            if (fullDocumentFromDb) {
                self.Resource.get({ _id: id }, function (response) {
                    if (response.noData) {
                        deferred.reject(response.noData);
                    }
                    var json = JSON.stringify(response.data);
                    var parsedJson = JSON.parse(json, jsonReviver);
                    var itemIndex = self.List.map(function (i) {
                        return i._id;
                    }).indexOf(id);
                    self.List[itemIndex] = parsedJson;
                    var dataCopy = angular.copy(parsedJson);
                    deferred.resolve(dataCopy);

                }, function (error) {

                });
            }
            else {
                self.List.forEach(function (item) {
                    if (item._id === id) {
                        deferred.resolve(item);
                    }
                });
            }
        }
        return deferred.promise;


    }

    update(item) {
        var self = this;var jsonMSDateTime = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        function jsonReviver(key, value) {
            if (jsonMSDateTime.test(value)) return new Date(value);
            else return value;
        }
        return self.Resource.update({ _id: item._id }, item).$promise.then(function (response) {
            var json = JSON.stringify(response.data);
            var parsedJson = JSON.parse(json, jsonReviver);
            var itemIndex = self.List.map(function (i) {
                return i._id;
            }).indexOf(response.data._id);
            self.List[itemIndex] = parsedJson;
            return parsedJson;
        }, function (err) {
            return err;
        });
    }

    remove(id) {

        var self = this;
        return this.Resource.remove({ _id: id }).$promise.then(function () {
            var item = self.List.map(function (i) {
                return i._id;
            }).indexOf(id);
            self.List.splice(item, 1);
            return self.List;
        }, function (err) {
            return err;
        });

    }

    add(item) {
        var self = this;var self = this;
        var jsonMSDateTime = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        function jsonReviver(key, value) {
            if (jsonMSDateTime.test(value)) return new Date(value);
            else return value;
        }
        return this.Resource.save(item).$promise.then(function (response) {

            // self.List does not exist when adding an item before a query has been
            // enacted.  So query to populate the list and since we are in the save callback
            // the item is in the returned query so don't push onto the list.
            var json = JSON.stringify(response.data);
            var parsedJson = JSON.parse(json, jsonReviver);
            if (!self.List) {
                return self.query().then(function () {
                    return parsedJson;
                });
            } else {
                self.List.push(parsedJson);
                return parsedJson;
            }



        }, function (err) {
            return err;
        });
        // var newItem = new this.Resource(item);
        // var self = this;
        // return newItem.$save(function(item){
        //     console.log(item.data);
        //     self.List.push(item.data);
        //     return item.data;
        // }, function(err){
        //     return err;
        // })
    }

    clear() {
        this.List = undefined;

    }




}