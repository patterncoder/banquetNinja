

function tmIdentity($window, $rootScope){
    var currentUser;
    
    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }
    
    function getClaimsFromToken(newToken) {
        var token = newToken || $window.localStorage['token'];
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }
    
    // if($window.localStorage['token']){
    //         currentUser = {};
    //         currentUser.user = getClaimsFromToken($window.localStorage['token']);
    //         //currentUser = JSON.parse($window.localStorage['userInfo']);
    // }
    if($window.localStorage['user']){
            currentUser = {};
            currentUser.user = JSON.parse($window.localStorage['user']);
            //currentUser = JSON.parse($window.localStorage['userInfo']);
    }

    function updateCurrentUser (user) {
        $rootScope.$broadcast('currentUser:updated', user);
        currentUser = user;

    }
    
    return {
        currentUser: currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        },
        isAuthorized: function(role){
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        },
        updateCurrentUser: updateCurrentUser
    }
}

tmIdentity.$inject = ['$window', '$rootScope'];

export default tmIdentity;