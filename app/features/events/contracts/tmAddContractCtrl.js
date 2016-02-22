import ninjaSchemas from 'ninjaSchemas';
import config from 'config';

class tmAddContractCtrl {
    constructor(
        $http,
        $scope, 
        $dataSource, 
        tmNotifier, 
        $state, 
        $mdDialog, 
        tmMongoose,
        model,
        schema,
        listView,
        detailView,
        headerText) {
            if(typeof(model) === 'string') {
                this.model = $dataSource.load(model);
            } else {
                this.model = model;
            }
            
            this.$scope = $scope;
            this.tmNotifier = tmNotifier;
            this.$state = $state;
            this.$http = $http;
            //this.model = model;
            this.schema = schema;
            this.listView = listView;
            this.detailView = detailView;
            this.dialogOptions = {headerText: headerText};
            this.$mdDialog = $mdDialog;
            this.tmMongoose = tmMongoose;
            this.newItem = new this.tmMongoose.Document({}, schema);
            this.fields = [];
            this.validationError = null;
            this.getFields();
            this.isLoading = false;
            
            
        }
        
    getLocation(val){
        var req = {
            method: 'GET',
            url: config.apiBase + '/customerSearch',
            //url: '//maps.googleapis.com/maps/api/geocode/json',
            // headers: {
            // 'x-access-token': undefined
            // },
            params: {
                Name: val
            }
        };
        
        return this.$http(req).then(function(response){
            console.log(response);
            return response.data.data.map(function(item){
                return item.firstName + ' ' + item.lastName;
            });
        });
    }
    
    setLoading(loading){
        this.isLoading = loading;
    }
    
    getFields(){
        for(var k in this.schema.paths){
            if(this.schema.paths.hasOwnProperty(k) && this.schema.paths[k].isRequired){
                this.fields.push(this.schema.paths[k]);
                this.newItem[k] = null;
            }
        }
    }
    
    cancel() {
        this.$mdDialog.cancel();
    }
    
    addItem(nextView){
        var self = this;
        self.newItem.validate(function(err){
            if(err) {
                self.validationError = err;
                self.$scope.$apply();
                return;
            }
            delete self.newItem._id;
            self.setLoading(true);
            self.model.add(self.newItem).then(function(data){
                self.tmNotifier.notify("Item was sucessfully added.")
                self.setLoading(false);
                self.$mdDialog.hide();
                if (nextView === 'details') {
                    self.$state.go(self.detailView, { id: data._id});
                }
                if (nextView === 'quick') {
                    self.$state.go(self.listView);
                }
            });
        });
        
       
    }
}



tmAddContractCtrl.$inject = [
    '$http',
    '$scope',
    '$dataSource',
    'tmNotifier',
    '$state',
    '$mdDialog',
    'tmMongoose',
    'model',
    'schema',
    'listView',
    'detailView',
    'headerText'
];

export default tmAddContractCtrl;