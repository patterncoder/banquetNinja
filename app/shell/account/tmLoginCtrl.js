

function tmLoginCtrl (tmAuth, tmIdentity, tmNotifier, $state) {
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
                tmNotifier.notify("You have successfully signed out!");
            }
            
        });
    };
    
    vm.goLogin = function () {
        $state.go('root.login');
    };
}


tmLoginCtrl.$inject = ['tmAuth', 'tmIdentity', 'tmNotifier', '$state'];
export default tmLoginCtrl;


