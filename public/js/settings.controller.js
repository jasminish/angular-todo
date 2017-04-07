angular.module('todoApp')
    .controller('SettingsController', SettingsController); 

SettingsController.$inject = ['UserService', 'AuthService', '$state'];
function SettingsController(UserService, AuthService, $state) {
    var setctrl = this; 

    setctrl.curUser = AuthService.getCurUser(); 

    setctrl.update = function() {
        // update in userlist 
        UserService.update(setctrl.curUser);

        // update curUser in session storage
        AuthService.setCurUser(setctrl.curUser.username, setctrl.curUser.password, setctrl.curUser.id);

        $state.go('profile');
    };

    setctrl.delete = function() {
        UserService.delete(setctrl.curUser.id);
        AuthService.logout(); 
        $state.go('home');
        location.reload();
    };

}