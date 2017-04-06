var todoApp = angular.module('todoApp', ['ui.router', 'todo']);

// app controller
todoApp.controller('AppController', AppController); 
AppController.$inject = ['AuthService', '$state'];
function AppController(AuthService, $state) {
    var ctrl = this; 
    this.logout = function() {
        AuthService.logout(); 
        $state.go('home');
    }
};

// routes
todoApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/views/home.partial.html',
            data: { requireLogin: false }
        })
        .state('todo', {
            url: '/todo',
            templateUrl: '/views/todo.partial.html',
            controller: 'todoController',
            data: { requireLogin: true }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.partial.html',
            controller: 'RegisterController',
            controllerAs: 'regctrl',
            data: { requireLogin: false }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.partial.html',
            controller: 'LoginController',
            controllerAs: 'logctrl',
            data: { requireLogin: false }
        })
});

todoApp.run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;

        if (requireLogin && sessionStorage.curUser === 'undefined') {
            event.preventDefault();
            return $state.go('login');
        }
    });
});