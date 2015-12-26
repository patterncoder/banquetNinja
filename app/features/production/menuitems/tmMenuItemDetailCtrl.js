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
            //tmModalSvc,
            $scope,
            tmMongoose){
        var self = this;
        self.err = {};
        self.$dataSource = $dataSource;
        self.$scope = $scope;
        self.$state = $state;
        self.tmMongoose = tmMongoose;
        //self.tmModalSvc = tmModalSvc;
        //self.tmDialogSvc = tmDialogSvc;
        //self.$mdDialog = $mdDialog;
        self.MenuItem = $dataSource.load('MenuItem');
        self.MenuItem.getOne($stateParams.id, true).then(function(data,status){
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
    
    close(){
        var self = this;
        // //self.$mdDialog.hide();
        // var dialogOptions = {
        //     closeButtonText: 'No',
        //     actionButtonText: 'Yes',
        //     headerText: 'Wait!',
        //     bodyText: 'Do you want to leave without saving?'
        // };
        
        // self.tmDialogSvc.showDialog({}, dialogOptions);
        
        var modalOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes',
                headerText: 'Wait!',
                bodyText: 'Do you want to leave without saving??'
            };
            self.tmModalSvc.showModal({}, modalOptions).then(function(result){
                    
                    self.reset();
                    self.$modalInstance.close();
                    self.$state.go('root.menuitems');
                });
            // if(self.detailForm.$pristine) {
            //     self.$modalInstance.close();
            //     self.$state.go('root.menuitems');
            // } 
            // else {
            //     self.tmModalSvc.showModal({}, modalOptions).then(function(result){
                    
            //         self.reset();
            //         self.$modalInstance.close();
            //         self.$state.go('root.menuitems');
            //     });
            // }
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
            //'tmModalSvc',
            '$scope',
            'tmMongoose'];

export default tmMenuItemDetailCtrl;