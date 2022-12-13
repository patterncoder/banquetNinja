import angular from 'angular';
class tmDialogSvc{
    constructor($mdDialog){
        
        this.$mdDialog = $mdDialog;
        this.dialogDefaults = {
            hasBackdrop: true,
            escapeToClose: true,
            fullscreen: false,
            template: require('apply!./tmDialogSvc.jade')
        };
        this.dialogOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };
        
    }
    
    showDialog (customDialogDefaults, customDialogOptions) {
        if(!customDialogDefaults) customDialogDefaults = {};
            //customDialogDefaults.backdrop = 'static';
            return this.show(customDialogDefaults, customDialogOptions);
    }
    
    show (customDialogDefaults, customDialogOptions) {
            var tempDialogDefaults = {};
            var tempDialogOptions = {};
            angular.extend(tempDialogDefaults, this.dialogDefaults, customDialogDefaults);
            angular.extend(tempDialogOptions, this.dialogOptions, customDialogOptions);
            
            if(!tempDialogDefaults.controller){
                tempDialogDefaults.controller = ['$scope','$mdDialog',function($scope, $mdDialog){
                    $scope.dialogOptions = tempDialogOptions;
                    $scope.dialogOptions.ok = function(result){
                        $mdDialog.hide(result);
                    };
                    $scope.dialogOptions.close = function(result){
                        $mdDialog.cancel(result);
                    };
                }];
                
            } 
            
            return this.$mdDialog.show(tempDialogDefaults).then((data) => {
                return data;
            });
    }
}

tmDialogSvc.$inject = ['$mdDialog'];

export default tmDialogSvc;