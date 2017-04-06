angular.module('todoApp')
        .controller('RegisterController', RegisterController);

RegisterController.$inject = ['UserService', '$location'];
function RegisterController(UserService, $location) {
    var regctrl = this;

    regctrl.register = function() {
        console.log('register');
        UserService.create(regctrl.user)
            .then(function (response) {
                if (response.success) 
                    $location.path('/');
            });
    };
}
