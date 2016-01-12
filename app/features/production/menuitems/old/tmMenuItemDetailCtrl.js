import angular from 'angular';
import _ from 'lodash';
// import productionSchemas from '../../../../schemas/production';
import {productionSchemas} from 'ninjaSchemas';



class tmMenuItemDetailCtrl {
    constructor( 
            $dataSource, 
            $stateParams, 
            tmNotifier,
            $state,
            tmDialogSvc,
            $scope,
            tmMongoose,
            tmMenuItemDocSvc){
        this.err = {};
        this.lookups = {categories:['Soup', 'Salad', 'Entree', 'Dessert']};
        this.selectedItem = null;
        this.tmNotifier = tmNotifier;
        this.$dataSource = $dataSource;
        this.$stateParams = $stateParams;
        this.menuItem = {categories:[]};
        this.$scope = $scope;
        this.$state = $state;
        this.tmDialogSvc = tmDialogSvc;
        this.tmMongoose = tmMongoose;
        this.tmMenuItemDocSvc = tmMenuItemDocSvc;
        console.log(this.tmMenuItemDocSvc);
        this.isLoading = false;
        this.loadData();
        
    }
    
    addCategory (category) {
        this.menuItem.categories.push(this.selectedItem);
        console.log(this.selectedItem);
        this.selectedItem = null;
    }
    
    setLoading (loading) {
        this.isLoading = loading;
    }
    
    docTest(){
        var self = this;
        this.tmMenuItemDocSvc.loadDocument(this.$stateParams.id).then(function(){
            console.log(self.tmMenuItemDocSvc.doc);
        });
        
    }
    
    docTestClearDoc(){
        this.tmMenuItemDocSvc.clearDocument();
        console.log(this.tmMenuItemDocSvc.doc);
    }
    
    loadData () {
        var self = this;
        this.setLoading(true);
        this.tmMenuItemDocSvc.loadDocument(this.$stateParams.id).then(function(){
            //self.$scope.apply();
            console.log(self.tmMenuItemDocSvc.doc);
        });
        // this.MenuItem = this.$dataSource.load('MenuItem');
        // this.MenuItem.getOne(this.$stateParams.id, true).then(function(data,status){
        //     self.setLoading(false);
        //     if(data.noData){
        //         self.tmNotifier.notify('That request was not found');
        //         self.$state.go('root.menuitems')
        //     }
        //     self.menuItem = new self.tmMongoose.Document(data, productionSchemas.menuitem);
        //     self.master = angular.copy(data);
        // }, function(error){
        //     if(error.data.noData){
        //         console.log(error.status);
        //         self.tmNotifier.error('That record does not exist');
        //         self.$state.go('root.menuitems');
        //     } else {
        //         console.log(error.status + error.message);
        //         self.tmNotifier.error('Something went wrong');
        //         self.$state.go('root.menuitems');
        //     }
            
        // });
    }
    
    addItemDialog(){
        // we should check if the form is pristine before allowing an add
        // currently this is not happening
        var self = this;
        if(this.allowTransitionAway()){
            var dialogConfig = {
            template: require('apply!../../../common/tmDialogAddItem.jade'),
            controller: 'tmDialogMenuItemAdd as vm',
            headerText: 'Add Menu Item'
            };
            this.tmDialogSvc.showDialog(dialogConfig);
        } else {
            
            this.leaveWithoutChanges().then(function(){
                var dialogConfig = {
                template: require('apply!../../../common/tmDialogAddItem.jade'),
                controller: 'tmDialogMenuItemAdd as vm',
                headerText: 'Add Menu Item'
                };
                self.tmDialogSvc.showDialog(dialogConfig);
                
            },function(){
                
            });
        }
        
    }
    
    
    
    reset(){
        var self = this;
        self.tmMenuItemDocSvc.undoChanges();
        
        //self.menuItem = angular.copy(self.master);
        self.detailForm.$setPristine();
    }
    
    back(){
        this.close();
    }
    
    leaveWithoutChanges () {
        var dialogOptions = {
                    closeButtonText: 'No',
                    actionButtonText: 'Yes',
                    headerText: 'Wait!',
                    bodyText: 'Do you want to leave without saving??'
            };
        return this.tmDialogSvc.showDialog({}, dialogOptions);
           
    }
    
    close(){
        var self = this;
        if (self.detailForm.$pristine){
            self.$state.go('root.menuitems');
        } else {
            var dialogOptions = {
                    closeButtonText: 'No',
                    actionButtonText: 'Yes',
                    headerText: 'Wait!',
                    bodyText: 'Do you want to leave without saving??'
            };
            self.tmDialogSvc.showDialog({},dialogOptions).then(function(result){
                self.$state.go('root.menuitems');
            });
            // var modalOptions = {
            //     closeButtonText: 'No',
            //     actionButtonText: 'Yes',
            //     headerText: 'Wait!',
            //     bodyText: 'Do you want to leave without saving??'
            // };
            // self.tmModalSvc.showModal({}, modalOptions).then(function(result){
            //         self.$state.go('root.menuitems');
            //     });
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
    
    allowTransitionAway(){
        return this.detailForm.$pristine;
    }
}


tmMenuItemDetailCtrl.$inject = [
            '$dataSource', 
            '$stateParams', 
            'tmNotifier', 
            '$state',
            'tmDialogSvc',
            '$scope',
            'tmMongoose',
            'tmMenuItemDocSvc'];

export default tmMenuItemDetailCtrl;
