import angular from 'angular';
import _ from 'lodash';
// import productionSchemas from '../../../../schemas/production';
import {productionSchemas} from 'ninjaSchemas';

class tmMenuItemDetailCtrl {
    constructor($dataSource, 
            $stateParams, 
            tmNotifier,
            $state,
            //$mdDialog,
            //tmDialogSvc,
            tmModalSvc,
            $scope,
            tmMongoose){
        
        this.err = {};
        this.$dataSource = $dataSource;
        this.$stateParams = $stateParams;
        this.$scope = $scope;
        this.$state = $state;
        this.tmMongoose = tmMongoose;
        this.tmModalSvc = tmModalSvc;
        this.isLoading = false;
        this.loadData();
        
    }
    
    setLoading (loading) {
        this.isLoading = loading;
    }
    
    loadData () {
        var self = this;
        this.setLoading(true);
        
        //console.log(requiredSchema);
        //this.tmNotifier.waiting('loading data...');
        // _.forEach(productionSchemas.menuitem.paths, function(n, key){
        //     console.log(n, key);
        // })
        // console.log(productionSchemas.menuitem);
        
        //console.log(_.pick(productionSchemas.menuitem.paths, 'isRequired'))
        this.MenuItem = this.$dataSource.load('MenuItem');
        this.MenuItem.getOne(this.$stateParams.id, true).then(function(data,status){
            self.setLoading(false);
            if(data.noData){
                self.tmNotifier.notify('That request was not found');
                self.$state.go('root.menuitems')
            }
            self.menuItem = new self.tmMongoose.Document(data, productionSchemas.menuitem);
            self.master = angular.copy(data);
        });
    }
    
    
    
    reset(){
        var self = this;
        self.menuItem = angular.copy(self.master);
        self.detailForm.$setPristine();
    }
    
    back(){
        this.close();
    }
    
    close(){
        var self = this;
        if (self.detailForm.$pristine){
            self.$state.go('root.menuitems');
        } else {
            var modalOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes',
                headerText: 'Wait!',
                bodyText: 'Do you want to leave without saving??'
            };
            self.tmModalSvc.showModal({}, modalOptions).then(function(result){
                    self.$state.go('root.menuitems');
                });
        }
    }
    
    saveChanges(){
        var self = this;
        self.menuItem.validate(function(err){
            if(err){
                self.err = err;
                console.log(self.err);
                console.log(err);
                self.$scope.$apply();
                return;
            }
            console.log('theoretically I could be saved');
        })
    }
}


tmMenuItemDetailCtrl.$inject = ['$dataSource', 
            '$stateParams', 
            'tmNotifier', 
            '$state',
            //'$mdDialog',
            //'tmDialogSvc',
            'tmModalSvc',
            '$scope',
            'tmMongoose'];

export default tmMenuItemDetailCtrl;