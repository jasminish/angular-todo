angular.module('todoApp')
    .controller('AppController', AppController); 

AppController.$inject = ['AuthService', '$state'];
function AppController(AuthService, $state) {
    var ctrl = this; 

    ctrl.curUser = AuthService.getCurUser(); 
    console.log(ctrl.curUser);
    if (ctrl.curUser === null) 
        ctrl.curUser = {username: "guest"};

    ctrl.logout = function() {
        AuthService.logout();
        $state.go('home');
        location.reload();
    }

    ctrl.isAuth = AuthService.isAuth(); 
};