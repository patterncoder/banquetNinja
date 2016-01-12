import angular from 'angular';
import _ from 'lodash';
// import productionSchemas from '../../../../schemas/production';
import {productionSchemas} from 'ninjaSchemas';



class tmMenuItemDetailCtrl {
    constructor( 
            $q,
            $dataSource, 
            $stateParams, 
            tmNotifier,
            $state,
            tmDialogSvc,
            $scope,
            tmMongoose,
            tmMenuItemDocSvc){
        this.$q = $q;
        this.tmNotifier = tmNotifier;
        this.$dataSource = $dataSource;
        this.$stateParams = $stateParams;
        this.$scope = $scope;
        this.$state = $state;
        this.tmDialogSvc = tmDialogSvc;
        this.tmMongoose = tmMongoose;
        this.tmMenuItemDocSvc = tmMenuItemDocSvc;
        this.isLoading = false;
        this.loadData();
        
    }
    
    setLoading (loading) {
        this.isLoading = loading;
    }
    
    loadData () {
        var self = this;
        this.setLoading(true);
        this.tmMenuItemDocSvc.loadDocument(this.$stateParams.id).then(function(){
            self.setLoading(false);
        });
        
    }
    
    addItem(){
        var self = this;
        this.canILeave().then(function(canILeave){
            if(canILeave){
                self.addItemDialog();
            }
        });
    }
    
    addItemDialog(){
        var dialogConfig = {
            template: require('apply!../../../common/tmDialogAddItem.jade'),
            controller: 'tmDialogMenuItemAdd as vm',
            headerText: 'Add Menu Item'
            };
            this.tmDialogSvc.showDialog(dialogConfig);
    }
    
    reset(){
        var self = this;
        console.log({controllerBeforeReset: self.tmMenuItemDocSvc.doc});
        self.tmMenuItemDocSvc.undoChanges();
        console.log({controllerAfterReset:self.tmMenuItemDocSvc.doc});
        self.detailForm.$setPristine();
    }
    
    canILeave(){
        var deferred = this.$q.defer();
        var canILeave = false;
        if (this.allowTransitionAway()) {
            canILeave = true;
            deferred.resolve(canILeave);
        } else {
            var dialogOptions = {
                    closeButtonText: 'No',
                    actionButtonText: 'Yes',
                    headerText: 'Wait!',
                    bodyText: 'Do you want to leave without saving??'
            };
            this.tmDialogSvc.showDialog({}, dialogOptions).then(function(result){
                canILeave = true;
                deferred.resolve(canILeave);
            },function(result){
                canILeave = false;
                deferred.resolve(canILeave);
            });
        }
        return deferred.promise;
    }
    
    allowTransitionAway(){
        return this.detailForm.$pristine;
    }
    
    close(){
        var self = this;
        this.canILeave().then(function(canILeave){
            if(canILeave){
                self.tmMenuItemDocSvc.clearDocument();
                self.$state.go('root.menuitems');
            }
        });
    }
    
    saveChanges(saveAndGo){
        var self = this;
        this.tmMenuItemDocSvc.saveChanges().then(function(){
            self.detailForm.$setPristine();
            self.detailForm.$setUntouched();
            if(saveAndGo){
                self.close();
                //self.$state.go('root.menuitems');
            }
        }, function(err){
            console.log('something went wrong');
        });
        
        
    }
    
   
}


tmMenuItemDetailCtrl.$inject = [
            '$q',
            '$dataSource', 
            '$stateParams', 
            'tmNotifier', 
            '$state',
            'tmDialogSvc',
            '$scope',
            'tmMongoose',
            'tmMenuItemDocSvc'];

export default tmMenuItemDetailCtrl;
