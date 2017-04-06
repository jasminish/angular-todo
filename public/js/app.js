var todoApp = angular.module('todoApp', ['ui.router', 'todo']);

todoApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/views/home.partial.html'
        })
        .state('todo', {
            url: '/todo',
            templateUrl: '/views/todo.partial.html',
            controller: 'todoController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.partial.html',
            controller: 'RegisterController',
            controllerAs: 'regctrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.partial.html',
            controller: 'LoginController',
            controllerAs: 'logctrl'
        })
});