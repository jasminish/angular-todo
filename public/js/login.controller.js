angular.module('todoApp')
        .controller('LoginController', LoginController);

LoginController.$inject = ['UserService', 'AuthService', '$location'];
function LoginController(UserService, AuthService, $location) {
    var logctrl = this;

    logctrl.login = function() {
        AuthService.login(logctrl.username, logctrl.password, function(response) {
            if (response.success) {
                AuthService.setCurrUser(logctrl.username, logctrl.password);
                $location.path('/');
            } 
        });
    };
}
