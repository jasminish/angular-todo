angular.module('todoApp')
        .controller('RegisterController', RegisterController);

RegisterController.$inject = ['UserService', '$state'];
function RegisterController(UserService, $state) {
    var regctrl = this;

    regctrl.register = function() {
        UserService.create(regctrl.user)
            .then(function (response) {
                if (response.success) 
                    $state.go('home');
            });
    };
}
