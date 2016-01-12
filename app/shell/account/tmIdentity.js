

function tmIdentity($window){
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
        var token = newToken || $window.sessionStorage['token'];
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }
    
    if($window.sessionStorage['token']){
            currentUser = {};
            currentUser.user = getClaimsFromToken($window.sessionStorage['token']);
            //currentUser = JSON.parse($window.sessionStorage['userInfo']);
    }
    
    return {
        currentUser: currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        },
        isAuthorized: function(role){
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
}

tmIdentity.$inject = ['$window'];

export default tmIdentity;