angular.module('todoApp')
    .factory('AuthService', AuthService);

AuthService.$inject = ['UserService'];

function AuthService(UserService) {
    var authService = {}; 

    authService.login = function(username, password, callback) {
        var response;
        UserService.getByUsername(username)
            .then(function (user) {
                if (user !== null && user.password === password) {
                    response = { success: true };
                } else {
                    response = { success: false, message: 'Username or password is incorrect' };
                }
                callback(response);
            });
    };

    authService.setCurUser = function(username, password) {
        var authData = username + password; // note: should be encoded
        var curUser = {
            username: username,  
            authData: authData
        }; 

        // store user in session storage
        sessionStorage.curUser = JSON.stringify(curUser);
    };

    authService.logout = function() {
        sessionStorage.clear();
    };

    authService.isAuth = function() {
        return sessionStorage.curUser !== undefined; 
    };

    return authService; 
}