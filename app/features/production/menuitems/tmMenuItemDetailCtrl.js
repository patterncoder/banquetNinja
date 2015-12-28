import angular from 'angular';
import productionSchemas from '../../../../schemas/production';
//import {menuitem as menuItemSchema} from '../../../../schemas/production';

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
        var self = this;
        this.err = {};
        this.$dataSource = $dataSource;
        this.$scope = $scope;
        this.$state = $state;
        this.tmMongoose = tmMongoose;
        this.tmModalSvc = tmModalSvc;
        //self.tmDialogSvc = tmDialogSvc;
        //self.$mdDialog = $mdDialog;
        this.MenuItem = $dataSource.load('MenuItem');
        this.MenuItem.getOne($stateParams.id, true).then(function(data,status){
            
            if(data.noData){
                tmNotifier.notify('That request was not found');
                //self.$modalInstance.close();
                $state.go('root.menuitems')
            }
            self.menuItem = new self.tmMongoose.Document(data,productionSchemas.menuitem);
            //self.menuItem = data;
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