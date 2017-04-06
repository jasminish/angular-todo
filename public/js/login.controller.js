angular.module('todoApp')
    .controller('LoginController', LoginController);

LoginController.$inject = ['UserService', 'AuthService', '$state'];
function LoginController(UserService, AuthService, $state) {
    var logctrl = this;

    logctrl.login = function() {
        AuthService.login(logctrl.username, logctrl.password, function(response) {
            if (response.success) {
                AuthService.setCurrUser(logctrl.username, logctrl.password);
                $state.go('home');
            } 
        });
    };
}
