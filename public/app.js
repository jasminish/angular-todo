var todoApp = angular.module('todoApp', ['ui.router']);

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
});