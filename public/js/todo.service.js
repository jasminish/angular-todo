angular.module('todoApp')
    .factory('TodoService', TodoService);

TodoService.$inject = ['$q', '$filter'];

function TodoService($q, $filter) {
    var todoService = {}; 

    todoService.getAllByUser = function(id) {
        var filtered = $filter('filter')(getTasks(), { userId: id });
        if (filtered === undefined)
            filtered = []; 
        return filtered; 
    };

    todoService.create = function(todo) {
        var deferred = $q.defer();

        var tasks = getTasks();
        if (tasks.length > 0)
            todo.id = tasks[tasks.length-1].id +1; 
        else 
            todo.id = 0; 
        tasks.push(todo);
        setTasks(tasks);

        deferred.resolve({ success: true });
        return deferred.promise;
    };

    todoService.delete = function(todo) {
        var deferred = $q.defer();

        var tasks = getTasks();
        var index = tasks.indexOf(todo); 
        tasks.splice(index, 1);
        setTasks(tasks);

        deferred.resolve({ success: true });
                
        return deferred.promise;
    };

    todoService.update = function(todo) {
        var deferred = $q.defer();
        var tasks = getTasks(); 
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === todo.id) {
                tasks[i] = todo; 
                break;
            }
        }
        setTasks(tasks);
        deferred.resolve(); 
        return deferred.promise; 
    }

    function getTasks() {
        var tasks = localStorage.getItem('tasks');
        if (tasks === null) 
            tasks = JSON.stringify([]);
        return JSON.parse(tasks);
    }

    function setTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    return todoService; 
}