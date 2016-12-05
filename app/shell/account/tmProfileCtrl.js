

function tmProfileCtrl ($dataSource, tmIdentity) {
    var $ctrl = this;
    var User = $dataSource.load("User");
    console.log(tmIdentity.currentUser.user._id);
    function init () {
        User.getOne(tmIdentity.currentUser.user._id,true).then(function(data){
            $ctrl.user = data;
        })
    }

    $ctrl.saveChanges = function(){ 
        User.update($ctrl.user).then(function(user){
            tmIdentity.updateCurrentUser(user);
            console.log(user);
        });
    }

    init();
}

tmProfileCtrl.$inject = ['$dataSource', 'tmIdentity'];

export default tmProfileCtrl;