import angular from 'angular';
import lodash from 'lodash';
import ninjaSchemas from 'ninjaSchemas';
import config from 'config';

function tmMenuGroupDetailCtrl (
    $scope,
    $state,
    tmDetailFactory,
    tmMenuGroupDocSvc,
    $http
) {
    var self = this;
    var constructorArgs = {
        $scope: $scope,
        docSvc: tmMenuGroupDocSvc,
        schema: ninjaSchemas.production.MenuGroup,
        model: "MenuGroup",
        listView: "root.menugroups",
        detailView: "root.menuGroupDetail",
        addHeaderText: "Add Menu Group"
    }
    
    this.__proto__ = tmDetailFactory(constructorArgs);
    
    //close overrides from tmDetailFactory.js
    this.close = () => {
        this.canILeave().then((result) => {
            if (result) {

                let backState = $state.back.fromState.name;

                this.docSvc.clearDocument();
                if (backState && backState != "") {
                    this.$state.go(backState, $state.back.fromParams);
                } else {
                    this.$state.go(constructorArgs.listView);
                }
            }
        });
    };

    this.$scope.$watch(function(){
        return self.docSvc.isDirty();
    }, function(newVal, oldVal,  scope){
        if(newVal){
            self.detailForm.$setDirty();
        } else {
            self.detailForm.$setPristine();
            self.detailForm.$setUntouched();
        }
    });

    this.setActive = () => {
        console.log("set active!");
        console.log(this.$stateParams.id);
        let req = {
            method: "PUT",
            url: `${config.apiBase}/production/menugroups/active/${this.$stateParams.id}`
        };

        this.$http(req).then((response) => {
            console.log("response: ", response);
        });
    };
    
    this.loadData().then(() => {
        this.docSvc.getMenus();
    });
    
    return this;
    
}

tmMenuGroupDetailCtrl.$inject = [
    '$scope',
    '$state',
    'tmDetailFactory',
    'tmMenuGroupDocSvc',
    '$http'
];

export default tmMenuGroupDetailCtrl;