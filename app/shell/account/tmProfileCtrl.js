

import config from 'config';
function tmProfileCtrl ($dataSource, tmIdentity, $http) {
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

    $ctrl.resetPassword = () => {
        
        var req = {
            method: 'PUT',
            url: `${config.apiBase}/users/${tmIdentity.currentUser.user._id}/resetpassword`,
            data: {
                current: $ctrl.currentpassword,
                new: $ctrl.newpassword
            }
        };

        $http(req).then((response) => {
            if (this.contractsList == undefined) {
                this.contractsList = [];
            }


            this.contractsList = response.data.data;
        });
    };

    init();
}

tmProfileCtrl.$inject = ['$dataSource', 'tmIdentity', '$http'];

export default tmProfileCtrl;