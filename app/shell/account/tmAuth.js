import config from 'config';

export default ['$http', '$q', '$window', 'tmIdentity', function ($http, $q, $window, tmIdentity){
    var userInfo;
    
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


    
    function login(username, password) {
        var deferred = $q.defer();
        
        $http.post(config.apiBase + '/account/login', {
            username: username,
            password: password
        }).then(function(result){
            if(result.data.success == true){
                
                userInfo = {
                    accessToken: result.data.token,
                    user: getClaimsFromToken(result.data.token)
                };
                $window.sessionStorage['token'] = result.data.token;
                $window.sessionStorage['user'] = JSON.stringify(result.data.user);
                $http.defaults.headers.common['x-access-token'] = result.data.token;
                
                tmIdentity.currentUser = userInfo;
                
                deferred.resolve(userInfo);
            } else {
                deferred.reject({success: false});
            }
            
            
            
        }, function(error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    function logout(){
        var deferred = $q.defer();
        
        $http.post(config.apiBase + '/account/logout', {
            headers: {"access_token": userInfo.accessToken}
        }).then(function(result){
            //$window.sessionStorage["token"] = null;
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.user;
            userInfo = null;
            // remove token from default headers
            $http.defaults.headers.common['x-access-token'] = null;
            tmIdentity.currentUser = undefined;
            deferred.resolve(result);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }
    
    function getUserInfo() {
        return userInfo;
    }
    
    function init(){
        if($window.sessionStorage['token']){
            userInfo = {
                    accessToken: $window.sessionStorage['token'],
                    user: getClaimsFromToken($window.sessionStorage['token'])
                };
        }
        
    }
    
    var tokenClaims = getClaimsFromToken();
    
    
    init();
    
    return {
        login: login,
        logout: logout,
        getUserInfo: getUserInfo,
        getTokenClaims: function () {
            return tokenClaims;
        }
    }
}];