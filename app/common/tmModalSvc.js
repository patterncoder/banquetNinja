import angular from 'angular';
class tmModalSvc{
    constructor($modal){
        
        this.$modal = $modal;
        this.modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            template: require('apply!./tmModalSvc.jade')
        };
        this.modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };
        
    }
    
    showModal (customModalDefaults, customModalOptions) {
        if(!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
    }
    
    show (customModalDefaults, customModalOptions) {
        var tempModalDefaults = {};
            var tempModalOptions = {};
            angular.extend(tempModalDefaults, this.modalDefaults, customModalDefaults);
            angular.extend(tempModalOptions, this.modalOptions, customModalOptions);
            
            if(!tempModalDefaults.controller){
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function(result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function(result){
                        $modalInstance.dismiss('cancel');
                    };
                };
            }
            return this.$modal.open(tempModalDefaults).result;
    }
}

tmModalSvc.$inject = ['$modal'];

export default tmModalSvc;