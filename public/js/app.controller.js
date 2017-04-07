angular.module('todoApp')
    .controller('AppController', AppController); 

AppController.$inject = ['AuthService', 'UserService', '$state'];
function AppController(AuthService, UserService, $state) {
    var ctrl = this; 

    var sessionUser = AuthService.getCurUser(); 
    if (sessionUser === null) 
        ctrl.curUser = {username: "guest"};
    else 
        UserService.getById(sessionUser.id)
            .then(function(user) {
                ctrl.curUser = user;
            });

    ctrl.logout = function() {
        AuthService.logout();
        $state.go('home');
        location.reload();
    }

    ctrl.isAuth = AuthService.isAuth(); 
};