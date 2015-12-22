

function tmLoginCtrl (tmAuth, tmIdentity, tmNotifier, $state, $rootScope) {
    var vm = this;
    vm.name = 'banquetninja';
    vm.loggedIn = false;
    vm.identity = tmIdentity;
    
    if(tmAuth.getUserInfo()){
        vm.loggedIn = true;
    }
    
    vm.signin = function (username, password){
        
        tmAuth.login(username, password).then(
            function(){
                vm.loggedIn = true;
                $rootScope.$broadcast('loggedIn');
                tmNotifier.notify("You have successfully signed in!");
                }, function() {
                    tmNotifier.notify('login failed');
                }
        );
        
        
    };
    vm.signout = function () {
        tmAuth.logout().then(function(result){
            
            if (result.data.success)
            {
                $rootScope.$broadcast('loggedOut');
                $state.go('root.home');
                tmNotifier.notify("You have successfully signed out!");
            }
            
        });
    };
    
    vm.goLogin = function () {
        $state.go('root.login');
    };
}


tmLoginCtrl.$inject = ['tmAuth', 'tmIdentity', 'tmNotifier', '$state', '$rootScope'];
export default tmLoginCtrl;


