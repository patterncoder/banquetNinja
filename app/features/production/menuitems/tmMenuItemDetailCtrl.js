import angular from 'angular';
import _ from 'lodash';
import ninjaSchemas from 'ninjaSchemas';



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
            tmMenuItemDocSvc,
            tmWindowStorage,
            tmDocFactory){
        var self = this;
        // DI
        this.$q = $q;
        this.tmNotifier = tmNotifier;
        this.$dataSource = $dataSource;
        this.$stateParams = $stateParams;
        this.$scope = $scope;
        this.$state = $state;
        this.tmDialogSvc = tmDialogSvc;
        this.tmMongoose = tmMongoose;
        this.tmMenuItemDocSvc = tmMenuItemDocSvc;
        this.tmWindowStorage = tmWindowStorage;
        // Vars
        this.closeDropDown = 'saveStay';
        this.tabIndex = 0;
        // 
        this.$scope.$watch(function(){
            return self.tmMenuItemDocSvc.isDirty();
        }, function(newVal, oldVal, scope){
            if(newVal){
                self.detailForm.$setDirty();
            } else {
                self.detailForm.$setPristine();
                self.detailForm.$setUntouched();
            }
        });
        // this.setUISettings();
        // setTimeout(function(){
        //     console.log(self.getUISettings());
        // },1000);
        console.log(tmMenuItemDocSvc);
        this.isLoading = false;
        this.loadData();
        
    }
    // buildToggler(navId){
    //     var self = this;
    //     return function(){
    //         self.$mdSidenav(navId)
    //             .toggle()
    //             .then(function(){
                    
    //             });
    //     }
    // }
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
        self.tmMenuItemDocSvc.undoChanges();
        self.detailForm.$setPristine();
        self.detailForm.$setUntouched();
    }
    
    addTitle(item){
        this.tmMenuItemDocSvc.addTitle(this.newTitle);
        this.newTitle = null;
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
    
    setUISettings() {
        this.tmWindowStorage.setLocalKey('closeDropDown', this.closeDropDown)
    }
    
    getUISettings() {
        this.closeDropDown = this.tmWindowStorage.getLocalKey('closeDropDown');
    }
    
    openSaveMenu ($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    }
    
    saveChanges(saveAndGo){
        var self = this;
        //if(this.allowTransitionAway()) {this.close()}
        this.tmMenuItemDocSvc.saveChanges().then(function(){
            self.detailForm.$setPristine();
            self.detailForm.$setUntouched();
            self.tmNotifier.notify("Menu Item has been saved.")
            if(saveAndGo){
                self.close();
            }
        }, function(err){
            self.tmNotifier.error("There was  problem with saving...try again.")
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
            'tmMenuItemDocSvc',
            'tmWindowStorage',
            'tmDocFactory'];

export default tmMenuItemDetailCtrl;
