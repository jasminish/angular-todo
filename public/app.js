var todoApp = angular.module('todoApp', ['ui.router']);

// routes
todoApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/views/home.partial.html',
            controller: 'AppController',
            controllerAs: 'ctrl',
            data: { 
                requireLogin: false,
                requireLogout: false 
            }
        })
        .state('todo', {
            url: '/todo',
            templateUrl: '/views/todo.partial.html',
            controller: 'TodoController',
            controllerAs: 'taskctrl',
            data: { 
                requireLogin: true, 
                requireLogout: false
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.partial.html',
            controller: 'RegisterController',
            controllerAs: 'regctrl',
            data: { 
                requireLogin: false, 
                requireLogout: true 
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.partial.html',
            controller: 'LoginController',
            controllerAs: 'logctrl',
            data: { 
                requireLogin: false, 
                requireLogout: true
            }
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'views/settings.partial.html',
            controller: 'SettingsController',
            controllerAs: 'setctrl',
            data: {
                requireLogin: true,
                requireLogout: false
            }
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.partial.html',
            controller: 'AppController',
            controllerAs: 'ctrl',
            data: {
                requireLogin: true, 
                requireLogout: false
            }
        })
});

todoApp.run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;
        var requireLogout = toState.data.requireLogout; 

        if (requireLogin && sessionStorage.curUser === undefined) {
            event.preventDefault();
            return $state.go('login');
        }
        if (requireLogout && sessionStorage.curUser !== undefined) {
            event.preventDefault(); 
            return $state.go('home');
        }
    });
});