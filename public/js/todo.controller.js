angular.module('todoApp')
    .controller('TodoController', TodoController);

TodoController.$inject = ['TodoService', 'AuthService', '$filter']; 

function TodoController(TodoService, AuthService, $filter){
    var taskctrl = this;
    var curUid = AuthService.getCurUser().id; 

    checkFilter();

    taskctrl.completeCount = (function() { 
        let count = 0; 
        let allTasks = TodoService.getAllByUser(curUid);
        allTasks.forEach(function(t) {
            if (t.completed) count++;
        });
        return count; 
    })();
    taskctrl.showCompleted = false; 

    taskctrl.add = function() {
        let todo = {
            name: taskctrl.taskName,
            completed: false,
            userId: curUid
        };
        TodoService.create(todo);
        checkFilter();
        taskctrl.taskName = "";
    };

    taskctrl.toggleComplete = function(t) {
        if (t.completed) 
            taskctrl.completeCount++;
        else 
            taskctrl.completeCount--;
        TodoService.update(t);
        checkFilter();
    };

    taskctrl.destroy = function(t) {
        TodoService.delete(t);
        checkFilter();
    };

    taskctrl.toggleFilter = function() {
        checkFilter();
    };
    
    function checkFilter() {
        taskctrl.tasks = TodoService.getAllByUser(curUid);
        if (!taskctrl.showCompleted) {
            taskctrl.filtered = $filter('filter')(taskctrl.tasks, { completed: false });
            taskctrl.tasks = taskctrl.filtered; 
        }
    }
};