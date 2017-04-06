angular.module('todoApp')
    .controller('AppController', AppController); 

AppController.$inject = ['AuthService', '$state'];
function AppController(AuthService, $state) {
    var ctrl = this; 

    var curUser = sessionStorage.curUser; 
    ctrl.curUser = curUser !== undefined ? JSON.parse(curUser) : {username: "guest"};
    ctrl.logout = function() {
        AuthService.logout();
        $state.go('home');
        location.reload();
    }

    ctrl.isAuth = AuthService.isAuth(); 
};