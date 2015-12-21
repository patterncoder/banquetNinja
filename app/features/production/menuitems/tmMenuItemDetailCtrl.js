import angular from 'angular';
import {menuitem as menuItemSchema} from '../../../../schemas/production';

class tmMenuItemDetailCtrl {
    constructor($dataSource, 
            $stateParams, 
            tmNotifier,
            $modalInstance,
            $state,
            tmModalSvc,
            $scope,
            tmMongoose){
        var self = this;
        self.err = {};
        self.$dataSource = $dataSource;
        self.$scope = $scope;
        self.$state = $state;
        self.tmMongoose = tmMongoose;
        self.$modalInstance = $modalInstance;
        self.tmModalSvc = tmModalSvc;
        self.MenuItem = $dataSource.load('MenuItem');
        self.MenuItem.getOne($stateParams.id, true).then(function(data,status){
            if(data.noData){
                tmNotifier.notify('That request was not found');
                self.$modalInstance.close();
                $state.go('root.menuitems')
            }
            self.menuItem = new self.tmMongoose.Document(data,menuItemSchema);
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
        var modalOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes',
                headerText: 'Wait!',
                bodyText: 'Do you want to leave without saving??'
            };
            
            if(self.detailForm.$pristine) {
                self.$modalInstance.close();
                self.$state.go('root.menuitems');
            } 
            else {
                self.tmModalSvc.showModal({}, modalOptions).then(function(result){
                    
                    self.reset();
                    self.$modalInstance.close();
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
            '$modalInstance',
            '$state',
            'tmModalSvc',
            '$scope',
            'tmMongoose'];

export default tmMenuItemDetailCtrl;